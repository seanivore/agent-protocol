# Changelog

One line per meaningful change to this protocol. Full history and rationale live in this repository's git log.

Version numbers here track the protocol itself, not any project.

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
