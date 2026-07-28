# Claude Design Collaboration

**Version**: v1.4.0 · **Last Updated**: 2026-07-22 (v1.4.0: the under-specification doctrine — precision goes to the seam, looseness goes to the design; the two exact things; the prototype as a discovery tool. v1.3.0: the packet-is-CD's-whole-world rule — self-contained distillation, CD never reads build guides; fixed-elements named per surface; the architecture line stated. v1.2.0: the shape-varies-per-project section — three aesthetic-anchor paths incl. the human-direct CD session, CD-scope range; the packet gains the complete UI build list + per-surface functionality/UX descriptions; `REVERSE_GAPS.md` formalized as a first-class artifact)
**Purpose**: how Claude Code and Claude Design build a real front end together — the handoff, the seam that keeps them safe, and the loop back for 1:1-synced fixes. Distinct from the funnel: the funnel *surfaces and ranks* directions; this *builds* the chosen one.
**Companions**: `.agents/_DESIGN/DESIGN_FUNNEL.md` (surfacing/choosing the direction first), `.agents/_DESIGN/INTERACTIVE_DESIGN_LANGUAGE.md` (the design-system reference you hand CD — its technique library plus the project's signature-moves spec cover animated-marketing-site FX; a separate ANIM_SITE recipe doc does not exist).

> The trigger principle: now that writing code is cheap, build the admin/creator experience with the same care as the end-user experience — treat the client like we treat the client's customers.

---

## What Claude Design is — and who does what

  + Two tools, one seam
    - Claude Design (CD): builds the front end in a *sandboxed* workspace — fast, real design, self-contained vanilla HTML/CSS/JS. It is NOT the git repo and is blind to the back end; it syncs only by explicitly copying files across (GitHub is the primary channel).
    - Claude Code (CC, here): owns the back end + integration — the data contract, the database/API, the wiring, the gap reviews.

  + The division of labor, stated plainly (a recurring confusion — pin it)
    - **CC does everything upstream of the build**: design funnels (peer-agent rendering runs — CD has no file access and no peer agents, it physically cannot run one), design research, the composite/spec authoring, the contract seam.
    - **CD enters only at the end of design planning**, receiving **final specs + a complete build list of all the UI needed** (the Phase A packet below). CD never sees funnel specs, intermediate renders, or the repo.
    - **The human** curates between those two worlds: ranks funnel output, composes winners from parts, approves the final spec that goes to CD.

  + **The packet is CD's WHOLE world — distill, never forward**
    - CD never receives or reads the IMPLEMENT set, addenda, schemas, or repo docs; its context stays focused on UI needs + design. The packet's per-surface descriptions must therefore be SELF-CONTAINED: everything CD needs for a surface — behavior, states, data fields, verbatim copy or its source text, constraints — distilled into the brief. If CD would have to ask or read elsewhere, the distillation failed, not CD.
    - **Name the FIXED elements per surface**: third-party mounted/iframe elements CD can style only through sanctioned hooks and never restructure — e.g. Stripe Custom Checkout's mounted elements (styled via the Appearance API variables + the surrounding page only; the element internals are untouchable), Google Maps embeds (framed, never restyled inside). An unnamed fixed element invites a design that can't be built.
    - **State the architecture line**: what must MATCH the project (token variable names, the vanilla/no-build constraint, seam files untouched, accessibility floor) vs where CD is FREE (internal CSS organization, markup structure, technique choices) so long as the output integrates and its PORTABLE files port clean.

  + **Precision goes to the seam; looseness goes to the design — the under-specification doctrine**
    - The packet conveys the details CD physically cannot see, without making it read a build guide: **the current data flow in and out of each component/page** it is asked to build (which fields arrive, which actions leave), plus **written UI + written UX per surface** — how the functionality should feel and work, which states exist (empty, error, loading, edge — a state missing from the brief is a BEHAVIOR gap, not a design freedom). That is the whole transfer.
    - **Then deliberately UNDER-SPEC the design.** The only place "exact, no guessing" applies is the seam — the data contract — because that is the one place a late mismatch actually hurts. Everywhere else, over-specifying wastes what CD is for: dictate the treatment and you've hired a rendering service, not a designer. The anchor is a taste sample for the look, not a layout spec.
    - **The "small things that must be done a certain way" are exactly two**: the seam field names (line-for-line with the real API) and the PORTABLE / SEAM / SANDBOX-ONLY handback tags (so both sides know what is safe to copy back). Everything else is loose ON PURPOSE — looseness here is a design decision, not a spec that ran out of time. (The fixed-elements inventory — third-party mounted/iframe elements styled only through sanctioned hooks — is a CONSTRAINT list, not design direction; it doesn't breach the doctrine.)
    - **The prototype is a discovery tool — plan for it, don't fight it.** CD building from provided details will inevitably surface needs nobody specced (a trigger, a field, a state); that is the superpower, not a planning failure. Expansions beyond the brief land in `REVERSE_GAPS.md` (surface · what the UX needs · why), where CC disposes of each in writing — the loop is how the prototype teaches you the backend needs.
    - The whole method in one line: **pin the seam tight · decide the behavior + list every surface · leave the design wide open · hand over a taste sample for the look · expect the prototype to teach you the backend needs.**

  + When to use it
    - a surface whose front end deserves real design: a client-facing app, a management dashboard, a product from scratch
    - not for a small tweak you can make directly

  + **The shape varies per project — expect to re-plan it each time, not reuse it**
    - **The aesthetic anchor can come from any of three paths — all producing the SAME artifact** (the component system: typography, palette, buttons, expressed as `tokens.css` + a `controls.html` sample sheet): a **design funnel** (when you need IDEAS — it renders options to rank and pull pieces from); a **human-direct CD session** (when the human already has the vision — work with CD on a few high-signal surfaces, a hero or one flagship page, to converge the system); or a **locked brand doc + tokens** (when direction is already settled on paper). Pick per project by how much vision exists; none is the default.
    - **CD's scope can range from a few surfaces to the entire front end.** When CD builds everything, the in-repo frontend track's job shifts to packet assembly, seam custody, integration/wiring, and verification — it stops being a page-building track.
    - **What never varies**: the contract seam pinned before CD builds; the packet contents (below); the PORTABLE/SEAM/SANDBOX-ONLY handback discipline; the line-by-line trap hunt; and the reverse gap list (§ The loop).

---

## The one invariant

Two things make the collaboration safe and repeatable across every phase.

  + **A contract seam** — CD builds "back-end-aware but back-end-untouching"
    - a `data-flow.md` contract states the entities/fields/actions; CD designs against it, does not implement it
    - the contract is realized as a `data.js` mock whose field names match the real API line-for-line, so arrays can later be swapped for real responses without touching markup
    - pin the contract EARLY (before CD builds) so the front end designs against something real, not a guess — retrofits that skip this get bumpy

  + **A file-tag taxonomy** — governs what happens to each file at handback
    - PORTABLE — pure front end (`*.html`, `*-app.js`, `portal.js`/`portal.css`); mechanically safe to drop into the repo after review
    - SEAM — the design/back-end boundary (`data.js`); port the added helpers/fields, never overwrite the real data layer with the mock rows
    - SANDBOX-ONLY — the fake-backend shim + the commented `<script>` lines that make the static files runnable in CD's sandbox; never ported

  + **The "safe to copy" trap** — load-bearing, do not skip
    - PORTABLE only means the copy won't *mechanically* break the server or build; it does NOT mean the change is back-end-neutral
    - a file changed because the UX improved — and a UX change can quietly need something new from the back end (a field to store, a validation rule, a "no end date" option, a gallery order that must persist)
    - you cannot tell which front-end changes carry a back-end need from the tag — only by reading the diff
    - so the line-by-line review of every changed file is not a mechanical safety check; it is the hunt for back-end work the front end silently created

---

## The three phases

Each phase differs only in the *starting artifact* CC sends. The seam and the tags are constant.

### Phase A — initial new-UI handoff (greenfield)

  + CC sends a code-free brief package
    - `brief.md` — the thesis + a KILL list + **the complete UI build list** (every page/screen/section CD is building — nothing discovered later) + a **written functionality + UX description per surface** (lifted from the build guide's specs: what it does, what the user experiences, which states exist — behavior is DECIDED here; visual treatment is CD's)
    - `data-flow.md` — the literal entity/field/action contract ("design to this; do not implement it")
    - an aesthetic anchor — a `controls.html` + `tokens.css` (a funnel-winning render, the human-direct CD session's converged system, or the brand doc's tokens) to lift verbatim
    - `reference/` — annotated screenshots + a LEGEND of keep/kill targets
    - explicit boundary: this package contains NO application code; do not integrate

  + CD returns a finished, unwired front end
    - `out/` — vanilla HTML/CSS/JS on a `data.js` mock
    - `INTEGRATION.md` — the front-door gap list (file map, the design/back-end boundary, numbered gaps)
    - `README.md` — how the files fit

  + Sync anchor
    - the `data-flow.md` contract — the mock's field names match the API line-for-line; state is computed, never stored

### Phase B — mid-build gap punch-list

  + CC sends a numbered gap-list
    - `GAPS.md` — real design/behavior gaps found while building the demo, each as where / now / fix, so a fresh CD chat can fix them directly in `out/`

  + CD returns updated files + a reverse-handoff
    - `CHANGELOG_GAPS.md` — per file: what changed, which files, how — each entry PORTABLE/SEAM tagged, in dependency-aware build order
    - `OPEN_QUESTIONS.md` — files it wants back, locked decisions to confirm, still-open back-end questions

  + CC closes the loop
    - `REPLY.md` — answers each open question code-checked with path + line; corrects any wrong assumption; ships the requested live files; hands its OWN gaps back for CD to mirror
    - sync anchor: the PORTABLE/SEAM tag map + a line-by-line reconcile pass

### Phase C — return-after-implementation / 1:1 re-sync (the bug-fix loop)

The distinctive one: after CC has implemented, you go back to CD for fixes by re-mirroring reality into CD's sandbox.

  + CC sends
    - the REAL implemented files at branch HEAD, path-mirrored 1:1 into CD's sandbox (CD has no filesystem — this byte-for-byte mirror IS the sync)
    - a scoped item batch (e.g. R / M / V / P / F sections, each item `<letter>-<n>`), each with the client's verbatim intent
    - a frozen-scope guarantee — "CC is paused on all these files" so nothing shifts under CD mid-round
    - a "what I already did / what I did NOT touch" note so CD knows its mirror is still current
    - the data contract to design against

  + CD adds locally, never returns
    - the SANDBOX-ONLY shim + commented `<script>` lines + a `SANDBOX_NOTES.md`

  + CD returns
    - the changed files as byte-identical drop-ins, mapped to the item IDs
    - `CHANGELOG_GAPS.md` + `OPEN_QUESTIONS.md`

  + CC closes
    - reviews every changed file line-by-line (the trap hunt), wires the back end, tests on a live preview, reconciles docs → dev → main on sign-off

  + Sync anchors, stacked
    - 1:1 pull from HEAD, re-pulled before each round
    - explicit touched/untouched disclosure each cycle
    - the PORTABLE / SEAM / SANDBOX-ONLY tag discipline

---

## The loop — don't engineer it away

  + The reverse-handoff IS the loop
    - a fast prototype surfaces requirements you could not spec up front ("oh, it needs to work *this* way") — that is the superpower, not a planning failure
    - keep the changelog + open-questions exchange cheap and explicit, and expect at least one lap

  + **The reverse gap list — `REVERSE_GAPS.md`, a first-class artifact (not a hunt)**
    - the UI build WILL surface backend needs nobody planned (a popup that needs a trigger, a field that must persist, a state the API doesn't expose). These arrive two ways: CD self-reports them mid-build (fold `OPEN_QUESTIONS.md`'s back-end items here), and CC's line-by-line trap hunt finds the silent ones at handback.
    - either way, every one becomes a `REVERSE_GAPS.md` line: **surface · what the UX needs · why the UX needs it** — then CC disposes of each explicitly: folded into the build guide (schema/endpoint/behavior change, routed like any other fold), or rejected with a written reason. No entry closes silently.
    - this is the artifact gap reviews read to verify the UI's technical requirements and the backend actually match — the trap hunt's output, tracked instead of vanishing into the reviewer's head.

  + The end state
    - PORTABLE files close to byte-identical on both sides, plus a lightweight record of which version is where, so "drop-in" never quietly rots into "drifted"

  + Retrofit caveat
    - replacing an existing surface is bumpier than greenfield — the front end gets prototyped before the contract is pinned, so the back end plays catch-up and bugs surface late
    - that is the situation, not the method breaking; from scratch with the contract set early, the loop is small and smooth

---

## The round-trip — pull a built site's aesthetic back into the Language

After CD builds something you like, capture its aesthetic in reusable vocabulary — so you can diverge from it next round. Paste this, filling the brackets:

```
You built [what — e.g. an immersive single-page experience for "[Project]"]. I don't need the code — I need you to describe what you actually built, as a reusable design + motion spec another designer or AI could read to rebuild the *feel* (not the content). Describe the version currently in this session, in industry-standard vocabulary, in these sections:

1. Concept / spine — the one governing idea and how it threads the page; the section order top to bottom.
2. Design system — Color (palette as tokens: background / ink / accent / muted, and what the accent does structurally); Typography (the voice system, the tension between faces, the signature title device); Texture & render (grain / paper / blur / depth); Layout grammar (the shell, the persistent chrome, the editorial devices).
3. Motion system — Easing & feel vocabulary (ease-out / languid; where any spring is reserved); Timing scale (micro-swaps / snappy UI / reveals / section settles / ambient cadences); Scroll behavior (smooth-inertial vs native; scrubbed vs fire-once; any horizontal tangent, pin, or multi-rate parallax); Choreography (the reveal-cascade order and the transition grammar between sections).
4. Signature techniques — a numbered list of the named, reusable moves you used, each with the technique name and how it's built (library/API).
5. Meaning-bound interactions — for each section, the one interaction and the idea it dramatizes.
6. Anti-slop tells — the specific craft choices that make it read as intentional, not templated.

Then, candidly:
7. What you'd push further — where the interactive design could go bolder or stranger with license.
8. What you deliberately held back — the restraint calls, and what a *different* aesthetic direction for this same content would trade them for.

Describe the vocabulary and the mechanism, not just the visible content — I'm going to reuse this language to explore a deliberately different aesthetic direction next round, so name the *feel* and the *technique*, not the surface.
```

  + Scope it to what you're keeping
    - re-skinning only? ask for just the motion, the structure, and the copy, and tell CD to skip the palette — a re-skin keeps the experience and throws out the look, so don't spend the prompt on colors you're replacing
    - capturing everything (a true teardown)? use the full prompt as written

  + What to do with the result
    - map its answers onto the axes in `.agents/_DESIGN/INTERACTIVE_DESIGN_LANGUAGE.md` — that tells you exactly which dials to change to diverge
    - feed items 7-8 into the next funnel spec's "§2 The bar" as the starting point to push *away* from

---

## Changelog

- **v1.4.0** (2026-07-22) — the **under-specification doctrine** (§ What Claude Design is): precision goes to the seam, looseness goes to the design — the packet transfers data-flow-per-surface + written UI/UX (states are behavior, not design freedom), then deliberately under-specs the treatment; the only two must-be-exact things are the seam field names and the handback tags; the prototype is a discovery tool feeding `REVERSE_GAPS.md`; the five-beat method line.
- **v1.3.0** (2026-07-22) — the **packet-is-CD's-whole-world** rule (§ What Claude Design is): CD's context stays UI-and-design-only — it never reads build guides; the packet distills each surface self-contained; **fixed elements** (Stripe mounted elements, Maps embeds — style-through-hooks-only) are named per surface; the **architecture line** (must-match vs CD-free) is stated explicitly.
- **v1.0.0** (2026-07-09) — first version, extracted from `DEV_RULES.md` and reconciled with the everlastings `CLAUDE_DESIGN_PARALLEL_BUILD.md`. The three phases (initial handoff / mid-build gap-list / return-after-implementation 1:1 re-sync), the contract seam + PORTABLE/SEAM/SANDBOX-ONLY taxonomy, the "safe to copy" trap, the loop + retrofit caveat, and the paste-ready "describe what you built" round-trip prompt.
