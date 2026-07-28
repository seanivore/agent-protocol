# Stripe Custom Checkout → "Elements with Checkout Sessions" — Agent Integration Guide

**What this is.** A drop-in reference for any project embedding Stripe's own UI elements in *your* page via a Checkout Session (formerly `ui_mode: 'custom'`, **now `ui_mode: 'elements'`** — see the breaking update below; not hosted/redirect Checkout, not raw Payment Element + PaymentIntents). **Read this before writing or debugging this flow.** It exists because this exact integration has been independently re-derived — and broken multiple times — across projects. It hands you the verified flow and a copy-paste browser probe so you confirm the live bundle yourself instead of trusting docs that *will* mislead you.

---

## ⚠️ BREAKING UPDATE — API release 2026-03-25.dahlia (verified against live docs 2026-07-20)

Stripe renamed the Checkout Session `ui_mode` enums as a **breaking change** and now brands this flow **"Elements with Checkout Sessions API."** Everything below this section was written in the `ui_mode:'custom'` / stripe-js ≤7 era — the architecture rules (elements own collection, no double-writers, probe-first) still hold; the exact names do not. What changed:

1. **Enum rename (hard failure on old values):** `hosted`→`hosted_page`, `embedded`→`embedded_page`, **`custom`→`elements`**. Passing the old values to a ≥2026-03-25 API version throws a validation error at session create. Source: docs.stripe.com/changelog/dahlia/2026-03-25/updates-available-checkout-session-ui-modes.
2. **Version pinning:** `ui_mode:'elements'` requires the API version ≥ `2026-03-25.dahlia` — either `Stripe-Version` header or an SDK that pins it (**stripe-node v22** pins `2026-06-24.dahlia`; the legacy `2025-03-31.basil` + stripe ^14 combo is two breaking trains behind). Client side needs **stripe-js ≥8** / react-stripe-js ≥5 (Clover made `initCheckout` synchronous; React imports moved to `@stripe/react-stripe-js/checkout`).
3. **THE INIT-METHOD LANDMINE IS NOW INVERTED.** This guide's oldest rule — "use `initCheckout`, never `initCheckoutElementsSdk`" — was true for the ≤7-era bundle. Stripe's **current** build guide and quickstart show **`stripe.initCheckoutElementsSdk({ clientSecret })`** (a Promise is accepted as `clientSecret`; no `fetchClientSecret` option appears in current docs). Whether the v8 bundle still exposes `initCheckout` as a working alias is **not documented — the probe decides** (§ Probe-first, updated below). Do not carry the old rule into a new build, and do not assume the new name from docs alone either: run the probe.
4. **Webhook API version (flag — needs verification per project):** align the webhook endpoint's API version in the Dashboard with the dahlia train when you upgrade, or event payload shapes may not match your parser. Standard Stripe upgrade practice; verify against the current webhook docs when you touch it.
5. **Capability restrictions may have loosened (flag — verify before relying):** external notes claim the elements pipeline supports post-creation session updates (line items, metadata, adjustable quantities) and richer native handling (automatic_tax, promo validation). Treat as unverified until confirmed against current docs + the probe for your project — none of it is required by the stable architecture below.

**Per-era summary:** legacy project (basil-pinned, stripe ^14, stripe-js ≤7) → the original guide below is accurate as written. New/upgraded project → `ui_mode:'elements'`, stripe-node ≥22, stripe-js ≥8, init method per probe, everything else in this guide unchanged in spirit.

---

## Why you can't trust the docs (read this first — it's the whole point)

Stripe ships several integrations that share vocabulary ("Checkout," "Elements," "Payment Element"): hosted Checkout, embedded Checkout, Elements + PaymentIntents, and Custom Checkout. Public docs **and LLM training** blend them, so a search for "Stripe custom checkout elements" returns confidently-wrong answers for *this* flow. Two specific traps cause ~all the pain:

1. **Wrong init method** *(≤7-era rule — INVERTED post-dahlia; see the breaking-update section)*. The basil-era bundle exposed **both** `stripe.initCheckout(...)` **and** `stripe.initCheckoutElementsSdk(...)`; for the old `ui_mode:'custom'` + `fetchClientSecret` flow the correct entry was **`initCheckout({ fetchClientSecret })`** while docs pushed the other. Current (stripe-js ≥8) docs show `initCheckoutElementsSdk({ clientSecret })` as the documented surface. The durable lesson isn't a method name — it's that **two lookalike entries exist and "method missing" is never your error**: the probe, not the docs, tells you which one is live for your bundle.

2. **The double-writer bug (the one that costs days).** Stripe's mounted elements (`createContactDetailsElement`, `createShippingAddressElement`, `createBillingAddressElement`, `createPaymentElement`) **collect and sync their own data to the session automatically.** If you *also* call `checkout.updateShippingAddress()` / `updateBillingAddress()` (because a doc told you to), you now have **two writers for one field** → `IntegrationError: …the Payment Element may also be collecting this field` → **`confirm()` is permanently blocked.** The mounted elements own collection. **Never put an `update*` call on top of a mounted element.**

**The one durable rule: probe the live bundle before you build, and lead with the probe-proven calls.** The release trains are a moving target (basil→clover→dahlia so far); exact method/option names drift — the init method itself has already flipped once. The *architecture* — init with the session's client secret + `confirm()`, elements own collection, no double-writers — is stable. Re-verify the *exact names and options* per project with the 5-minute probe below.

---

## The verified-correct flow *(as written: the ≤7 / basil era. New builds: `ui_mode:'elements'` + probe-chosen init — the composition rules below carry over)*

### Server — create the session, return the clientSecret

```ts
const session = await stripe.checkout.sessions.create({
  ui_mode: 'custom',   // ≥2026-03-25.dahlia: 'elements' (old value throws)
  mode: 'payment',
  line_items,
  allow_promotion_codes: true,
  shipping_address_collection: { allowed_countries: ['US'] }, // your countries
  // ALWAYS provide a shipping option (even $0). Without one the total never resolves
  // and session.canConfirm stays false forever.
  shipping_options: [{
    shipping_rate_data: {
      type: 'fixed_amount',
      fixed_amount: { amount: 0, currency: 'usd' },
      display_name: 'Free shipping',
    },
  }],
  // Collect phone SERVER-SIDE — the address element REJECTS a `fields` option (see gotchas).
  phone_number_collection: { enabled: true },
  // OMIT customer_creation unless you've verified it populates session.customer under
  // ui_mode:'custom' (it can 500 the create or no-op). Null-guard stripe_customer_id downstream.
  return_url: `${baseUrl}/complete?session_id={CHECKOUT_SESSION_ID}`,
});
// respond with { clientSecret: session.client_secret }
```

- **Never pass `payment_method_types`** — let Stripe's dynamic payment methods decide (configure in the Dashboard).
- `return_url` must contain the literal `{CHECKOUT_SESSION_ID}` template. With Vercel `cleanUrls`, drop the `.html`.

### Client — init, mount, listen (read-only), confirm

```js
const checkout = await stripe.initCheckout({
  fetchClientSecret: async () => clientSecret,  // NOT `clientSecret:` ; NOT initCheckoutElementsSdk
  elementsOptions: {
    appearance: { theme: 'stripe', variables: { colorPrimary: '#000000' } },
    syncAddressCheckbox: 'billing', // renders ONE default-checked "billing same as shipping"
  },
  // NO defaultValues — initCheckout REJECTS it (see gotchas). Field prefill is not supported here.
});

checkout.createContactDetailsElement().mount('#contact');
checkout.createShippingAddressElement({ display: { name: 'split' } }).mount('#shipping'); // no `fields`
checkout.createBillingAddressElement().mount('#billing');
checkout.createPaymentElement({ fields: { billingDetails: 'never' } }).mount('#payment'); // billing comes from the billing element

// READ-ONLY listener: gate the pay button + paint totals. NEVER write back to the session here.
checkout.on('change', (session) => {
  payBtn.disabled = !session.canConfirm;
  // session.total?.total?.amount, session.shippingOption?.total?.amount,
  // session.shippingAddress?.address?.country, etc.
});

payBtn.addEventListener('click', async () => {
  const r = await checkout.confirm();                 // redirects to return_url on success
  if (r && r.type === 'error') show(r.error.message); // declines / validation errors land here
});
```

**There are zero `update*` calls. That is the point.**

---

## Gotchas (observed live — with the exact error strings)

| If you…                                                             | Reality                                                                                           | Symptom / error                                                                                                      |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| use `initCheckoutElementsSdk`                                       | wrong entry for this flow                                                                         | silent wrong-API; nothing works as the docs say                                                                      |
| call `update*` over a mounted element                               | forbidden (double-writer)                                                                         | `IntegrationError: …may also be collecting this field`; `confirm()` blocked                                          |
| pass `defaultValues` to `initCheckout`                              | rejected                                                                                          | `IntegrationError: options.defaultValues is not an accepted parameter`                                               |
| pass `fields` to `createShippingAddressElement`                     | rejected                                                                                          | `IntegrationError: options.fields is not an accepted parameter`                                                      |
| need to collect phone                                               | use server `phone_number_collection`, NOT element `fields`                                        | —                                                                                                                    |
| call `checkout.applyDiscount(...)`                                  | doesn't exist                                                                                     | use `checkout.applyPromotionCode(code)`                                                                              |
| omit `shipping_options`                                             | total never resolves                                                                              | `session.canConfirm` stuck `false`; "$NaN" totals                                                                    |
| let the Payment Element collect billing AND mount a billing element | duplication / double-writer                                                                       | use `createPaymentElement({ fields:{ billingDetails:'never' } })` + separate billing element + `syncAddressCheckbox` |
| set `customer_creation:'always'` under `ui_mode:'custom'`           | can 500 the create or not populate `session.customer`                                             | omit it; null-guard `stripe_customer_id`; derive your customer by email                                              |
| prefill the email                                                   | unsupported via `defaultValues`; `updateEmail()` over the mounted contact element = double-writer | leave the contact element empty; capture email elsewhere                                                             |

`name: 'split'` (First/Last) **is** accepted via `display: { name: 'split' }` on the shipping element. Method surface (enumerate with `Object.keys(checkout)` — they're own-properties, not on the prototype): `createContactDetailsElement`, `createEmailElement`, `createShippingAddressElement`, `createBillingAddressElement`, `createPaymentElement`, `createExpressCheckoutElement`, `confirm`, `applyPromotionCode`, `removePromotionCode`, `on`, `session`, plus the `update*` family (which you deliberately don't use for addresses).

---

## Probe-first protocol (run on the real preview, before building)

Confirm the surface yourself in ~5 minutes. **Must run on a real deployed preview URL** — not `vercel dev` / localhost; the loaded bundle (and any deploy-protection/SSO) only behave correctly on a real URL. If the preview has deploy protection, use a browser already authenticated to it.

```js
// 1) Init method check (no session needed). Post-dahlia the roles may be swapped vs the
//    legacy rule — enumerate BOTH and let the working one win; record which for your build doc.
const k = window._stripePublishableKey;          // or your publishable key
typeof Stripe(k).initCheckout;                    // legacy-era entry (≤7: USE; ≥8: verify)
typeof Stripe(k).initCheckoutElementsSdk;         // current-docs entry (≥8: likely USE — prove it)

// 2) Get a clientSecret however your app does (call your create endpoint), then init + enumerate
const c = await Stripe(k).initCheckout({ fetchClientSecret: async () => cs, elementsOptions: { appearance: { theme: 'stripe' } } });
Object.keys(c).sort();          // real method surface
Object.keys(c.session()).sort(); // session shape — look for canConfirm, total, email, billingAddress, lineItems

// 3) Option-acceptance (each rejected option throws SYNCHRONOUSLY — wrap in try/catch)
//    e.g. a fresh init with defaultValues should throw; createShippingAddressElement({fields:...}) should throw;
//    createPaymentElement({ fields:{ billingDetails:'never' } }) and createShippingAddressElement({ display:{ name:'split' } }) should be ok.

// 4) Composition mount test: inject temp divs, mount contact+shipping+billing+payment,
//    wait ~3s, confirm NO IntegrationError in the console and that iframes render.
//    That proves the no-double-writer composition for your project's bundle version.
```

Record the answers — they fill your build doc's "verified contract" so the building agent never guesses. (The full confirm() round-trip and typed-address auto-sync need a test card + filled form — validate those in your end-to-end test pass, not the probe.)

---

## Deployment notes (Vercel)

- `api/*.ts`: the old "must compile to CommonJS" rule is **dead** — Vercel's current docs show ESM TypeScript as the primary pattern (Node 24 default; verified 2026-07-20). Don't `require()` ESM-only deps.
- Test on the **preview URL**, never localhost.
- With `cleanUrls: true`, `return_url` and redirects drop `.html`.
- Buyer order confirmation can be Stripe's native branded receipt (Dashboard → Settings → Emails + Branding) — no custom buyer email needed for v1.

## Post-mortem (why this guide exists)

On one project this exact flow was rebuilt **five times** before the root cause was isolated: manual `update*` bridges fighting the self-syncing elements, plus chasing `initCheckoutElementsSdk` from the docs. The fix wasn't new code — it was *deleting* the bridges and leading with `initCheckout({ fetchClientSecret })` + `confirm()`. The probe above would have found it in one session. **Probe first; trust the bundle over the docs.**
