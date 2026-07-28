# [Project] — Design Funnel Spec

<!--
  This is the design TARGET every funnel agent reads first (the `SPEC_PATH` in design_funnel.mjs).
  Fill every bracket. Keep it self-contained — the funnel agents see only this file, not the repo.
  Copy this file to the project (e.g. assets/docs/design/DESIGN_FUNNEL_SPEC.md) and point SPEC_PATH at it.
  Author "§2 The bar" by choosing from ~/.agents/design/INTERACTIVE_DESIGN_LANGUAGE.md.

  NOTE (v2 framing, see DESIGN_FUNNEL.md): funnels are planned bespoke per run — this template matches
  the worked-example script (design_funnel.mjs). A bespoke funnel adapts or trims these sections to fit
  its own script; keep the invariant that whatever spec you write is SELF-CONTAINED for the agents.
  Funnels run in Claude Code only; Claude Design never sees this spec — it gets final specs + a UI build list.
-->

## 1. What this is + who it's for

- **Product**: [one line — what it is]
- **Primary user + context**: [who, on what device, doing what — e.g. "a maker on a phone in the studio"]
- **The job**: [the single thing a visitor/user must be able to feel or do]

## 2. The bar — the design direction to diverge across

Chosen from `~/.agents/design/INTERACTIVE_DESIGN_LANGUAGE.md`. This is what makes the funnel render *distinct* worlds.

- **Archetype**: [scroll-narrative / single-task / practical-dashboard / data-decision / mobile-collection]
- **Motion budget**: [high & narrative / low & functional / minimal & orienting — per the archetype map]
- **Axis leanings** (set the ones that matter; leave the rest open for the funnel to explore):
  - tempo: [languid ↔ kinetic]
  - easing character: [weight / bounce / mechanical]
  - motion trigger: [ambient / scroll-linked / pointer / state-data]
  - depth: [flat / parallax / card / 3D]
  - texture/finish: [paper-grain / glass / neon / print / concrete]
  - density: [airy ↔ dense]
  - interaction model: [OS / Deck / Terminal / Canvas / Feed / Document / Form-flow]
- **Named starts to diverge across** (paste these into `STARTS` in the script; leave blank to let R3 pick the most distinct):
  - [Start A — e.g. "Cyber-Noir Terminal"]
  - [Start B — e.g. "Warm Naturalist Trail"]
  - [Start C — e.g. "Weight-not-Bounce Studio Slate"]
- **Ambition**: [Safe / Bold / Avant-Garde — push at least one direction toward Bold or Avant-Garde]

## 3. Hard constraint — the stack

- **Build target**: [e.g. vanilla HTML/CSS/JS, no framework/build; GSAP + ScrollTrigger + Lenis allowed]
- **Non-negotiables**: [accessibility, prefers-reduced-motion, mobile-first, performance budget…]
- (Match this to `STACK` in the script; the Engineering exec holds a hard veto on anything not buildable here.)

## 4. Information architecture / content

- **Sections / surfaces**: [the ordered list of sections or the surface inventory]
- **The content** (in the client's voice; the funnel animates good copy, it does not invent claims):
  - [headline / key copy / the data / the CTA — embed the essentials so the spec is self-contained]

## 5. Functional / content requirements

- [Requirement 1 — what each surface must do or say]
- [Requirement 2]
- [Requirement 3…]

## 6. The concepts the design must make feel obvious

- [The one or two ideas a visitor should *feel* without being told — these become the meaning-bound interactions]

## 7. The deliverable

- The funnel returns **N distinct named directions**, each rendered as self-contained HTML that opens in a browser.
- [Name the render targets — the primary surface + which signature components each direction must show.]

## 8. Success criteria

- The rendered directions are **genuinely distinct** (different interaction models / lineages), not recolors of one idea.
- Each passes the craft bar in `~/.agents/design/INTERACTIVE_DESIGN_LANGUAGE.md`.
- [Project-specific: e.g. "feels like walking a trail, not scrubbing a slideshow."]
