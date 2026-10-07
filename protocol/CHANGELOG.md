# Changelog

One line per meaningful change to this protocol. Full history and rationale live in this repository's git log.

Version numbers here track the protocol itself, not any project.

---

## v5.7.0 — 2026-10-06 — One writing standard for every reader

**Why**: the protocol split writing into two modes. Agent documents were dense by default, and the readable "human-formatted" layout was opt-in. Sean suspected that the looser agent-to-agent style, especially around gap reviews, had seeped into writing in general. His direction: *"instead of working towards exclusively human-accommodating or non-human-accommodating writing, we should treat the reader as universal, aiming instead for clarity and structure that can benefit us all."* He also asked that the v5.6.0 draft-then-edit order not read as one-size-fits-all.

**What changed**

  - AGENTS.md § IX is now WRITING. It opens with the universal-reader standard. Headings are categorical. Indentation shows belonging. Formatting is used only for emphasis or grouping, each form has one meaning, and emphasis appears at most once per bullet. Sentences are short, and run-ons are rewritten, not stitched together with em dashes. All of these are defaults that serve lower cognitive load, not laws. The "Dense by default" bullet is gone.
  - AGENTS.md § III "Draft, then edit" now describes revision as iterative. Writers reread mid-sentence, restructure, and start again from a better point. Length fits the purpose, so a draft should not be too long or too short.
  - `references/HUMAN_FORMATTING.md` became `references/WRITING_LAYOUT.md`. The opt-in gate is removed. The frame and worked examples stay, and Sean's notes on headings, indenting, and emphasis are folded in.
  - DEVELOPER_PROFILE.md and GAP_REVIEW.md point to the one standard. Gap-review findings files are written to it too.
  - Three project auto-memories that said "stay dense unless asked" now point to the new file.

**Not done on purpose**: older text in these documents was not rewritten. It migrates when someone next edits it substantially. Restyling is not trimming: the change is to shape, never to content, and the repeated counter-reflex instructions stay.

**The general lesson**: a style allowed in one corner of a system spreads to the rest. One standard, with narrow named exemptions, is easier to hold than two modes with a switch between them.

## v5.6.0 — 2026-09-11 — New standing order: draft, then edit, before publishing anything

**Why**: while hand-reviewing a resume document built across many agent sessions, Sean found a claim specific enough to the project it was written for that it was risky left in a document meant to get him hired — the kind of thing a human writer would have caught and cut on a silent re-read, but that survives when a first pass ships as the final pass. His own framing: *"Writing too often is done without reflection... it doesn't mean we shouldn't be making up for that in literally everything being written."* He extended the same complaint to chat output — long, repetitive status messages a human cannot read as fast as they're produced.

**What changed** (AGENTS.md § III STANDING ORDERS): added **"Draft, then edit — before every document and every message,"** placed right after "Read whole." Both orders counter the same reflex — treating a first pass as good enough — one on the input side (skimming instead of reading), the new one on the output side (publishing instead of revising). It applies to documents and to ordinary chat replies alike, and it explicitly says Sean's own message length and speed are never a model to imitate — a fast, unedited message from him is still just data, not a style cue.

**The general lesson, worth carrying**: a rule that only prevents adding bad content is incomplete without a matching rule that catches bad content already drafted. Generation is cheap; the revision pass is where quality actually gets decided, and nothing forces that pass to happen unless it's written down as a standing order.

## v5.5.0 — 2026-08-26 — Two reversals: no custom staging subdomains, and A-0 is not the default

**Why (staging domains)**: the `dev.<apex>` standard was introduced in v5.4.0 on the belief that a branch-pinned custom domain escapes Vercel's SSO wall. v5.4.1 disproved that belief the following day — but only patched the protection claim and left the subdomain mandate standing, so the rule kept costing DNS slots for a benefit that no longer existed. Sean, setting up `rss-feed` and now short on subdomain slots: *"an agent had the inaccurate assumption that using a dev custom URL would eliminate the need to turn off SSO. We confirmed that was not true and two projects created custom dev URLs in the DNS now and I am running out of sub domain spots… We do not create our own staging URLs, it has no actual value."*

**What changed (GIT_AND_DEPLOY.md § Environments)**: the staging URL is the Vercel-generated branch URL; do not create a custom staging subdomain. The one narrow exception — proposed to Sean, never assumed — is a project whose staging must genuinely exercise passkeys/WebAuthn, cookie-domain-scoped auth, or same-registrable-domain CORS, since a `.vercel.app` origin is a separate registrable domain on the Public Suffix List. That registrable-domain fact was the only load-bearing part of the old rule and it is preserved as the exception rather than deleted. Projects that already created a `dev.` subdomain keep it — no churn. The per-project `ssoProtection` decision from v5.4.1 is unaffected and still stands.

**Why (Phase A-0)**: `CLAUDE_DESIGN_COLLAB.md` called A-0 "optional, and increasingly the default," and `GAP_REVIEW.md` echoed it, so a planning thread reached for an early prototype round on a project whose UI was already fully described in Sean's own prose. His correction: *"There isn't really need for a baby step early-protocol for this project because we already have the UI needs almost certainly defined, and any reverse gaps they come back with will be minimal… even with very big build, like the entire admin backend of the web store, there was no point to even pause to bring an early prototype."*

**What changed (GAP_REVIEW.md § The Claude Design seam, CLAUDE_DESIGN_COLLAB.md § Phase A-0)**: A-0 is explicitly NOT the default. It is a fallback for genuinely undescribed flows, and it stays available mid-flight — if a live CD session starts revealing that the shape is moving, back up to A-0 then, a call that reads better from inside the session than from a planning thread guessing in advance. Also recorded: on a project where CD builds the WHOLE front end, the gate lands AFTER the handback, not before — there is no front-end plan to certify while CD still holds it, so what the orchestrator certifies pre-handoff is the packet and the seam, and the gap reviews run on the integrated result where the reverse gaps are finally knowable. Backend slices keep the ordinary ordering.

**The general lesson, worth carrying**: v5.4.1 corrected a premise but not the rule the premise had justified. When a finding kills the reason for a standard, re-derive the standard — do not patch around it and leave it in force.

## v5.4.2 — 2026-08-26 — No agent sign-off on commits; the harness default is switched off

**Why**: an agent working in `get-paid` reported "all nine commits lack the `Co-Authored-By` trailer" as a defect against protocol — and flagged it hard enough to offer a rebase and force-push to fix it. It was not a protocol rule at all. It comes from the Claude Code system prompt, which instructs a `Co-Authored-By: Claude <model>` trailer on every commit in every project regardless of what the project's own conventions say. § IX said nothing about trailers, so the agent had no way to tell the product default apart from Sean's convention and defaulted to the louder one. Sean's own read: *"I don't really see the need for agents to sign off if it is their commit. It is honestly pretty evident which are mine and which were an agents."*

**What changed** (AGENTS.md § IX Writing Mechanics): the commits bullet gains an explicit **no `Co-Authored-By`, no agent sign-off** rule, naming the harness default as the source so a future agent recognizes it rather than obeying it. The default is also switched off at the machine level — `attribution.commit: ""` in `~/.claude/settings.json`, which suppresses the trailer for every project at once. Note `includeCoAuthoredBy` is the deprecated spelling of the same control; `attribution` is the current key. The rule records that a reappearing trailer means the setting was lost, so the fix is to restore the setting rather than to strip commits by hand.

**The general lesson, worth carrying**: where a product default and this protocol disagree, silence in the protocol reads as assent. Anything the harness does automatically that Sean does not want has to be written down here as a negative rule, not just left unmentioned.

## v5.4.1 — 2026-08-12 — Correction: Vercel protection does NOT exempt staging custom domains

**Why**: first end-to-end implementation of the v5.4.0 staging standard (on `dev.thots.august.style`, Thot v6 setup) hit a Vercel SSO wall that the v5.4.0 note said could not happen. Live docs (updated 2026-07) confirm current Standard Protection protects ALL non-production URLs *including custom domains pinned to a preview branch*; `all_except_custom_domains` is a legacy API value that no longer exempts branch domains; domain-level exceptions are Enterprise / a $150-per-month Pro add-on. The v5.4.0 claim was taken from settings inspection, never verified by an actual request against a branch-pinned custom domain (`dev.ckheals.com` was standardized but never created). Also learned: protection is stamped per deployment at build time, so settings changes only affect subsequent deployments.

**What changed** (GIT_AND_DEPLOY.md § Environments): the "protection stays ON, never turned off project-wide" instruction is replaced with a deliberate per-project choice — public-content projects set `ssoProtection: null` so the staging domain is genuinely public; sensitive projects keep Vercel Authentication and use authenticated-browser driving plus Protection Bypass for Automation (or the paid exceptions add-on). The `dev.<apex>` naming rule and the registrable-domain rationale stand unchanged.

## v5.4.0 — 2026-08-11 — The staging domain standard: `dev.<apex>`, protection stays on

**Why**: rooted-joy's staging domain was named `rooted-joy.ckheals.com` (after the Vercel project), which (a) confused the owner three weeks later — the name looks like a product surface, not a testing target — and (b) permanently spends a meaningful subdomain the business can never use for a real landing page. Separately, GIT_AND_DEPLOY still instructed "turn preview protection OFF during development," which live inspection showed obsolete: Vercel's default Standard Protection (`ssoProtection: all_except_custom_domains`) already exempts custom domains, so a custom staging subdomain is publicly reachable for webhooks, auth redirects, and agent browser testing while every raw `*.vercel.app` URL stays protected.

**What changed** (GIT_AND_DEPLOY.md § Environments): every future project's staging domain is **`dev.<apex>`** — grey-cloud CNAME, attached to the Vercel project, and explicitly **assigned to track `dev`** (attaching alone leaves it on production). Deployment protection is never turned off project-wide; the old instruction is superseded in place. Also recorded why staging must live under the apex's registrable domain at all: cookies, CORS, and WebAuthn RP IDs behave as production only there (`.vercel.app` is on the Public Suffix List). Existing projects keep their recorded staging names — no churn.

## v5.3.0 — 2026-07-30 — Prototyping is a gap-finding instrument: the early CD seam (Phase A-0)

**Why**: a rooted-joy planning round finished five design passes, and then the owner wrote one end-to-end UI/UX description that superseded parts of two of them — not because the passes were careless, but because **writing a flow and prototyping a flow are the same mechanism, and a gap review is not that mechanism.** A review *reads* a plan; both of the others *walk* it, and implied back-end decisions live in the sequence, which is why a plan can pass every angle and still be missing a whole workflow. The owner also named the constraint that makes this doctrine rather than preference: the prose is expensive and cannot be produced to order — *"writing that took hours and it is not a skill I can summon… prototyping with CD does the same thing. They are interchangable."* So the protocol must never sit waiting on writing that may never come.

**`design/CLAUDE_DESIGN_COLLAB.md` → v1.5.0** gains **Phase A-0**, an early prototype run *before* deepening whose deliverable is findings rather than a front end; a **`PROVISIONAL` data-shape carve-out** to the one invariant, gated on four conditions (behavior described, shape complete enough to bind a mock, labelled in `data-flow.md`, every divergence landing in `REVERSE_GAPS.md`) so that discovery is loud rather than silent; and the **ask-for-the-flow-not-the-field** rule. A-0 is explicitly guarded: it never replaces Phase A, never pins the contract, and **only finds gaps in surfaces already on the build list** — breadth remains CC's job and still comes first.

**`protocol/GAP_REVIEW.md` § The Claude Design seam** now names **two seams instead of one** — integration stays last, prototyping can be first — and records the CONTRACT-PAYMENTS trap as doctrine: an agent planned an entire negotiation workflow and surfaced a single fork about whether two fields were editable; the owner answered the small question in good faith with no idea a workflow had been decided. **A confident answer to a small question reads as sign-off on the large one, so asking it is worse than not asking.** Both documents also price the consequence honestly: findings that supersede careful work are the method succeeding, and the "we already decided that" reflex is the cost of the old ordering, not evidence of waste.

---

## v5.2.1 — 2026-07-29 — State the CD collaboration's whole point where nobody can miss it

**Why**: the model's purpose was present in `CLAUDE_DESIGN_COLLAB.md` but buried three levels deep as a sub-bullet ("pin the contract EARLY … not a guess"), so a rooted-joy session inverted it — surfaces with fully-described behavior reached the packet without their data shapes, and the owner watched an agent conclude his own written specs were missing. His read afterwards: *"the whole point of what we're doing should be clear in the collab agent doc — if not, we'll prob have issues."* Correct.

**§ The one invariant now opens with the point as a headline**: CC declares the data in and out BEFORE CD designs, so CD never does back-end work and `REVERSE_GAPS` only collects what the prototype pushes BEYOND what was declared. Three consequences stated under it: a surface arriving without its contract forces CD to invent one (a back-end decision made by the design side, found at handback); `REVERSE_GAPS` degrades from a delta channel into a dumping ground for our own undone homework, burying the real findings; and the owner's prose is the INPUT to that declaration, with deriving entities/fields/states/endpoints from it named as CC-side work.

---

## v5.2.0 — 2026-07-28 — The twin capture: Sean's UX/UI prose is the functional spec, collected from the start like goals

**Why**: the CD-collab shift created an ownership gap — when planners also built the UI, carrying Sean's descriptive UX writing was automatically their job; "CD owns design" quietly read as "UX isn't mine," and in rooted-joy his multi-paragraph surface descriptions (present since the first requirements doc) were presented back to him as "no scope or plan exists." His division of labor is explicit and now doctrinal: he supplies how a feature works AND how it feels; deriving the backend/data shapes from that prose is the agent's job.

**`AGENTS.md` § V gains "Capture the experience with the same discipline — the goals' twin"**: his prose routes faithfully, at arrival, into the architecture doc's **Functionality & Experience Specification** (the canonical behavior repository; GOALS.md keeps the distilled why). Distillations harvest from it, never thin it, and **no surface may be called unscoped/data-free/pending until the corpus has been harvested** — the only valid gap-flag is "described behavior X lacks endpoint/envelope Y."

**`templates/PROJECT_NAME.md` gains the Functionality & Experience Specification section** (per-surface: what it does / what the user experiences and feels / implied states) with the capture-and-harvest instructions inline. **`templates/GOALS.md`** notes the twin capture so the two files name each other.

**`GAP_REVIEW.md`**: Phase 1 step 1 folds the concept doc's UX writing into the spec section alongside the goals fold, and "Goals are load-bearing" gains the UX-shaped twin of the absence-vs-intent failure with the harvest-before-declaring-unscoped rule.

**`CLAUDE_DESIGN_COLLAB.md`** Phase A: the brief's per-surface descriptions are HARVESTED from the spec section (never re-derived thin); a surface enters the brief as data-free only after the harvest confirms nothing was described; described surfaces ship with declared data shapes in `data-flow.md` — CD designing without a declared shape is CD doing the backend, and REVERSE_GAPS only works when the shape was declared first.

---

## v5.1.0 — 2026-07-28 — GOALS.md becomes a full core file; a named cron exception

**GOALS.md gets the same treatment as `PROJECT_NAME.md` and `README.md` now**: a template exists (`templates/GOALS.md`), § IV creates it explicitly at project start (seeded from the concept doc), and `GAP_REVIEW.md` Phase 1 makes explicit that a new initiative inside an existing project folds its own concept document into `GOALS.md` too, the same way a new project does — previously asserted as an outcome with no action step behind it.

**§ V names "the core files"** — auto-memory, `GOALS.md`, `PROJECT_NAME.md`, `README.md` — as the four things every session checks and leaves true, and broadens the auto-memory habit from the two-orchestrator pattern specifically to a universal leave-a-note-on-what's-next practice.

**`GIT_AND_DEPLOY.md` gains a named cron exception**: Vercel Cron fires only on the production deployment, never preview, so a project with scheduled tasks needs a narrow, still-signed-off early push of the minimal keep-alive/dispatcher slice to `main` to prove it fires — the smallest correct shape of the exception, not a corner cut.

**Stale references fixed in `templates/PROJECT_NAME.md` and `templates/README.md`**: both still pointed at the retired `.agent/DEV_RULES.md` and the old bare `docs/` path, having survived the v5.0.0 rewrite untouched because templates aren't read at session start the way `AGENTS.md` is.

---

## v5.0.0 — 2026-07-28 — Rewritten, and moved to one global home

**The whole system was rewritten from its concepts rather than edited, and relocated to a single canonical copy at `~/.agents/`.**

The old `DEV_RULES.md` had reached 490 lines and ~12,700 words after a year of appending — every hard-won lesson had arrived as a new paragraph beside the old ones, with its own war story and hedges, and nothing had ever been re-argued from scratch. Agents began commenting on its size and searching it instead of reading it, which defeats the purpose of a must-read protocol. It was also duplicated into 22 project directories and synced by hand.

**What changed structurally:**

- `AGENTS.md` is the single always-on starting point — 175 lines, replacing 490. Everything else is reached from its map, marked must-read-always, must-read-when-relevant, or reference.
- The gap-review procedure, which was 43% of the old document, became `protocol/GAP_REVIEW.md`.
- Naming, versioning, directory layout, and retention became `protocol/DIRECTORY_PROTOCOL.md`.
- Branching, deploys, and environment-key discipline became `protocol/GIT_AND_DEPLOY.md`.
- The memory-tier routing became `protocol/MEMORY_ROUTING.md`.
- The human profile became `DEVELOPER_PROFILE.md`, merging what had been split across three files.
- Design, references, and templates moved into `design/`, `references/`, and `templates/` as-is — they were extracted deliberately in v4.3.0 and never suffered the accretion problem.
- 27 changelog entries collapsed into this one; the detail is in git.

**What changed in substance:**

- **`GOALS.md` is now load-bearing and stated as such.** It had one thin line in the entire old system. The plan is built around the goals end to end, and they are the lens *every* review reads through — self-review, breadth pass, and formal gate alike. Without them a reviewer reads missing functionality as intentional design rather than a gap.
- **The Claude Design seam is placed.** The CD return packet integrates last in the build guide, immediately before testing. Reverse gaps get disposed of by size: small ones like bugs, large ones by backing up and re-planning with at least light gap reviews. The CD collaboration is named as the one place that needs more flexibility than the rest of the build.
- **"Take the time, never budget tokens" was promoted into THE CORE**, carried by Sean's own words, rather than sitting among the standing orders.
- **`references/STRIPE_CHECKOUT.md` was replaced with the newer copy** that had only existed in one project. It carries the 2026-03-25.dahlia breaking change — `ui_mode` renamed `custom` → `elements`, API version pinning, and the guide's own oldest rule about `initCheckout` now inverted. The fleet copy predated it and would have actively misled.
- **`GAP_REVIEW_WORKFLOW_PROMPTS.md` was folded in as the round-handoff appendix**, including the peer-round templates that had also only existed in one project despite being referenced fleet-wide.
- **`PROJECT_LESSONS.md` references were dropped.** It was required reading in the old rules and existed in zero projects; per-project auto-memory already does that job.
- **The `docs/` versus `assets/docs/` contradiction was resolved to `assets/docs/`**, matching the project template and every recent project.

**How it reaches projects now:** `~/.claude/CLAUDE.md` is a one-line redirect here, so it loads in every project on the machine. Each project carries `.agents/AGENTS.md` and `.cursor/CURSOR.md` as redirects for the other tools. Nothing about this protocol is copied into a project, and nothing needs syncing.

The complete pre-rewrite state is archived at `~/Development/_planner/archive/agents-protocol-2026-07-28/` with a manifest and checksums.

---

## Before v5.0.0

The protocol ran from v1 through v4.11.0 as a single `DEV_RULES.md` file distributed to every project. Its version-by-version history is in the git log of that file and in the archived copy above. The load-bearing arc, briefly:

- **v4.0.0** — restructured around *exclusively executable* and the fresh-instance gap review.
- **v4.1.0** — the gap-review loop mechanics formalized: three-part lens, flag-don't-assert, the landmines ledger, the verdict trichotomy, angle-by-angle close, end-game cleanup, "the gate is never the first reviewer."
- **v4.3.0** — the interactive-design method extracted into four dedicated documents.
- **v4.4.0** — retired the separate BUILD, TRACK_BUILD, BUILD_REPORT, and SESH file types; execution now runs directly from the gate-cleared IMPLEMENT, with git history as the progress log.
- **v4.5.0** — shared terminal commands centralized in `~/Development/scripts`.
- **v4.6.0** — landmines ledger inlined into every angle's block; cold-A delivered as uploaded files.
- **v4.7.0** — the functionality-design pass, for slices whose logic is not settled yet.
- **v4.8.0 / v4.8.1** — peer agents established as gate-grade for B/C/D under five guardrails; angle A stays external; angle D given its two charges.
- **v4.9.0** — environment-key discipline: every scope seeded correctly at once.
- **v4.10.0 / v4.11.0** — human-hands items formalized as SETUP, owned by planning and empty before execution opens.
- 2026-08-11 — CLAUDE_DESIGN_COLLAB.md header version corrected v1.4.0 → v1.5.0 (drift: the v1.5.0 changelog entry landed 2026-07-30 without the header bump).
