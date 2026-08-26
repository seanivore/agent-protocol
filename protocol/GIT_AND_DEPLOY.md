# Git & Deploy

Branching, merging, tagging, and the platforms they publish to. **Check the current Vercel and Cloudflare CLI docs before driving them** — both change often, and your memory of their flags is dated.

---

## The branches

- **`main`** — production. Tagged releases only: tested, bug-free, public-ready.
- **`dev`** — the persistent integration branch. Where previews deploy from.
- **`feat/*` and `fix/*`** — temporary, deleted after merge.

Because everything reaches `main` by fast-forward from `dev`, `dev` is always at or ahead of `main` and the two never drift apart.

---

## Starting a project

```bash
cd ~/Development && mkdir <project> && cd <project>
cp -R ~/Development/_git_init/. .
git init && git add . && git commit -m "chore: initial commit"
git branch -M main
gh repo create <project> --public --source=. --remote=origin
git push -u origin main
git checkout -b dev
```

Copying `_git_init/` first is what puts the secrets files in place and gitignored *before* git is initialised. Do not reorder those steps.

---

## Shipping a change

**1. Branch off current `main`.**

```bash
git checkout main && git pull origin main && git checkout -b feat/<name>
```

**2. Ship through `dev` first.** The fast-forward merge keeps history linear; the push triggers the preview deploy.

```bash
git checkout dev && git merge --ff-only feat/<name> && git push origin dev
```

**3. 🛑 STOP HERE.** Tell Sean it is live on the dev preview URL — the URL is in the README or the architecture doc — with a one-line summary of what changed. **Do not ship to `main` until he signs off.** If he finds a bug, fix it on `feat/*`, fast-forward into `dev`, push, and tell him again. Production is untouched throughout.

**4. Ship to `main`** once all of these are true: tests pass · Sean has signed off · the architecture doc is current · `package.json` is bumped if applicable · the build succeeds.

```bash
git checkout main && git merge --ff-only dev && git push origin main
git tag vX.Y.Z && git push origin vX.Y.Z
```

Tags are pure numeric — `v3.1.2`, never `v3.1.2-fix`. Human-readable labels belong in the commit body or the GitHub release. Re-pointing a tag means deleting and recreating it.

---

## Commits

`type(scope): brief [vX.Y.Z]` plus body bullets, from `feat fix docs style refactor test chore`.

Commit often — usually per file — and word each message to mirror the slice it implements, so the history maps onto the plan. **Git history is the progress log**; there is no separate session log or build report. Confirm with `git diff` before committing.

---

## Environments

**Environments track branches.** Pushing `dev` deploys the Vercel preview; `main` is production. **Verification runs against the real deployed preview URL** — never `vercel dev` (the local emulator), never localhost. Testing something that is not what ships tells you about a thing that does not exist. **Use the stable branch alias, not the per-deployment hash URL**: Vercel mints a fresh `*-<hash>-<scope>.vercel.app` for every deployment, but it also keeps an unchanging branch alias (`<project>-git-<branch>-<scope>.vercel.app`) that always points at that branch's latest deployment. The branch alias is the staging URL — it is what goes in the README, in webhook endpoints, and in auth-redirect allowlists, and with `ssoProtection` off it is directly verifiable in a browser and by agents.

**The staging URL is the Vercel-generated branch URL. Do not create a custom staging subdomain.** *(Standardized 2026-08-26, withdrawing the `dev.<apex>` rule of 2026-08-11.)* Vercel gives every branch a stable generated URL and that is staging — it costs nothing, needs no DNS record, and it is the URL that goes in the README's preview link, in webhook endpoints, and in auth-redirect allowlists during development. The `dev.<apex>` standard is withdrawn because its premise was wrong: it was introduced on the belief that a branch-pinned custom domain escapes Vercel's SSO wall, that belief was disproven in live testing the following day (see the next paragraph), and without it the subdomain bought nothing while permanently spending a scarce DNS slot. In Sean's words: *"We do not create our own staging URLs, it has no actual value."* Existing projects that already created one keep it — do not churn them.

**The one narrow exception, proposed to Sean rather than assumed.** With protection off, a `*.vercel.app` branch alias is an ordinary public origin and very nearly everything works on it — webhooks, CORS with an explicit origin allowlist, OAuth redirects, and host-only session cookies all behave normally. `.vercel.app` sits on the Public Suffix List, and the residue of that is exactly two behaviors: a **cookie scoped domain-wide across subdomains** cannot be set, because browsers refuse cookies scoped to a PSL entry; and a **WebAuthn RP ID cannot be scoped above the alias's own host**, so a passkey registered on staging is a different relying party from production and cross-subdomain passkey sharing cannot be exercised at all. Only a project whose staging must genuinely test one of those two things justifies a `dev.<apex>` subdomain, and the reason gets named when it is proposed. Everything else verifies fine on the branch alias.

**Deployment protection: decide per project, because Vercel protects every preview URL.** *(Corrected 2026-08-12 after end-to-end verification on `dev.thots.august.style` — the previous claim that Standard Protection exempts all custom domains was never verified live and is wrong on current Vercel.)* Current behavior (docs `last_updated` 2026-07): **Standard Protection protects every non-production URL, explicitly including custom domains pinned to a preview branch**: every preview URL, generated or custom, WILL sit behind a Vercel SSO redirect under every Vercel Authentication mode; the legacy API value `all_except_custom_domains` is still accepted but does not exempt branch domains; domain-level Deployment Protection Exceptions are an Enterprise feature / $150-per-month Pro add-on. Also note protection is stamped per deployment at build time — a settings change only affects deployments created after it. So choose deliberately: **(a) public-content projects** (static sites, apps with no secrets or server surface) → set `ssoProtection: null` for the project; the preview URL is then genuinely public for webhooks, auth redirects, and agent browser testing. **(b) sensitive projects** → keep Vercel Authentication ON; drive staging through an already-authenticated browser session, use Protection Bypass for Automation headers for webhooks/agents, or pay for the exceptions add-on if the preview URL must be publicly reachable.

**The cron exception.** Vercel Cron Jobs fire only on the production deployment, never on preview — so a project with scheduled or timed tasks cannot verify that behavior on `dev` no matter how solid everything else is. Where this applies, the sign-off gate narrows rather than disappears: push the smallest possible slice to `main` — the keep-alive ping or dispatcher scaffold alone, no front end, nothing it triggers yet — specifically to prove the schedule fires, then freeze `main` there until the real gate clears for everything else. A minimal backend-only push that proves the one thing preview can't is the correct shape of this exception, not a corner cut. It is still an explicit, named exception the orchestrator proposes and Sean signs off on — never a silent workaround for "I want to test something."

---

## Environment keys

**Seed every scope at once, each with its correct value from the start.** Development, Preview, and Production together, in one pass: Production gets **live** keys, Preview and Development get **test** keys.

Never seed test keys into Production intending to swap them at go-live. It is extra work and a guaranteed re-do, and the "so they cannot be used by accident" rationale is a corner-cut rather than a reason — least privilege lives in *which* keys a scope holds, not in deferring the setup. Set each scope right the first time. The only unavoidable later step is a value that does not exist yet, like a live webhook secret minted at go-live.

**`.env.reference` is a durable record, not a machine-readable source.** A gitignored document holding every key grouped by production / preview / development, so that when Vercel periodically locks or drops env values they get re-pushed from here rather than reconstructed from scratch. It exists to protect Sean from lost keys.

Do not architect build commands around grepping values out of it inline, per command. That pattern is a workaround for agent shell-state quirks dressed up as a foundation, and it quietly turns a human's record into fragile plumbing. If a script needs values, read them once inside that script. Keep the record comprehensive, and never delete from it.

---

## DNS

**DNS lives on Cloudflare, not Vercel.** The apex `august.style` is on Cloudflare; Vercel is authorised for the apex, so production branches publish to a **subdomain**. Create and point subdomains with the **Cloudflare CLI**, using the token already in the shell.

Vercel used to suggest the Cloudflare DNS change and apply it for you. It no longer reliably does — edit Cloudflare directly.
