# Interactive Design Playbook

**Version**: v1.0.0 · **Last Updated**: 2026-07-09
**Purpose**: how to *wield* the Interactive Design Language — the levers that produce caliber, a briefing checklist, and the vocabulary for feedback rounds. The Language is the WHAT; this is the HOW.
**Companions**: `.agents/_DESIGN/INTERACTIVE_DESIGN_LANGUAGE.md` (the vocabulary this directs), `.agents/_DESIGN/DESIGN_FUNNEL.md` (the funnel), `.agents/_DESIGN/CLAUDE_DESIGN_COLLAB.md` (the handoff).

> The funnel mechanics and the Claude Design handoff each live in their own doc. This one is the craft of briefing and iterating — what to ask for, and how to react.

---

## The two-input principle

  + Separate WHAT from HOW
    - WHAT: the content — the concept, section order, every headline, the data, the CTA, in the client's voice
    - HOW: the system — the Language (axes, techniques, a start, an archetype's motion budget)
    - keep both as separate inputs so you can reuse the HOW across projects and swap the WHAT freely

  + Why two beats one big prompt
    - it lets you reuse the design system unchanged while content changes
    - it hands the model a rubric to self-check against, which raises the floor of the output

  + The handoff phrasing
    - "Use the content for all copy and section order. Use the Language as the design and motion system — match its vocabulary and techniques, not any example's content. Treat the craft bar as acceptance criteria."

---

## The levers

Nine levers produce Fable-caliber work. Each scales down for a dashboard or a form — the lever still applies, the volume changes.

  + **Concept before components** — lead with the idea, not the section list
    - one sentence of strong point-of-view beats a page of feature requirements
    - "X told as a [letter / field guide / confession / exhibition / case file]"
    - scaled down: even a dashboard has a concept — "a cockpit," "a ledger," "a control room" — name it

  + **Name a motion system, not "animations"** — ask for one coherent language
    - specify the feel (entrances ease-out and calm; reserve spring for one place) and the mechanism (scrubbed reveals, smooth scroll, one ambient loop per scene)
    - scaled down: for a tool, the system is "weight not bounce; motion only on state change; nothing decorative"

  + **Interactions that mean something** — every interactive element dramatizes a claim
    - for each section, invent one interaction that *proves* that section's point
    - scaled down: on a dashboard the "claim" is a status — the interaction makes the state legible, not decorative

  + **A type system with tension** — three voices that cross a boundary
    - display serif × mono × humanist sans, a signature title device, and forbid the Inter/Roboto/Poppins monoculture
    - scaled down: even one-voice tools benefit from a mono "instrument" voice for labels and numbers

  + **One structural accent** — a single color doing structural work
    - punctuation, numerals, the cursor, progress — and drive it from one token so a swap re-themes everything
    - scaled down: on a dashboard the accent carries status/priority — spend it, don't scatter it

  + **Texture and depth, explicitly** — name the opposite of flat
    - tactile grain, backdrop-blur depth, layered parallax, a cursor with real z-depth
    - scaled down: even a dense tool wants hairline borders and elevation-as-information over flat fills

  + **Easter eggs with a reward** — hidden depth that pays off attention
    - a keyboard re-theme, "never repeats" generative art, a live clock; plant the hint in plain sight
    - scaled down: a tool's "egg" can be a power-user shortcut or a delightful empty-state

  + **Name the trend reference and the stack** — keep it current and buildable
    - "search and use current-year design trends" stops it defaulting to last-era patterns
    - optionally name the toolchain (GSAP + ScrollTrigger, Lenis, WebGL, canvas) so the output is buildable

  + **Restraint, stated out loud** — calm by default
    - "one ambient motion per scene, no element enters without a reason, springiness reserved for the cursor"
    - asking for restraint is what makes the few big moments land

---

## Research — where to look, what to search for

The funnel's research lenses (and any "search current trends" brief) are only as good as where you point them. Send them to the cream of the crop, not template galleries — and filter everything through House taste (`.agents/_DESIGN/INTERACTIVE_DESIGN_LANGUAGE.md`).

  + Where to look — curation and craft
    - award / curation: Awwwards, The FWA, CSS Design Awards, Godly, SiteInspire, Land-book, Minimal Gallery, Lapa Ninja, Refero
    - CSS + JS craft: Codrops (demos + tutorials), CodePen (Picks / Spark, the GSAP + ScrollTrigger tags), web.dev + "CSS Wrapped", State of CSS, the GSAP and Motion showcases, Three.js showcase, Shadertoy
    - mobile: Mobbin, Screenlane, Page Flows
    - type + brand: Typewolf, Fonts In Use, Brand New

  + What to search — more specific than "2026 trends"
    - "award-winning [archetype] site" · "scroll-driven storytelling site" · "GSAP ScrollTrigger showcase" · "CSS view-transitions demo" · "generative canvas art website" · "WebGL shader landing page" · "kinetic typography site" · "[named start] web design" · "wow factor web design"
    - keep one evocative catch-all in the mix — "wow factor" / "award-winning [archetype]" surface the make-them-gasp exemplars that technique-named searches miss
    - reverse-engineer one or two exemplars with a frame-by-frame teardown (the Fable-teardown method) rather than skimming ten

  + Aim at what is buildable-impressive — the vanilla frontier Claude Design can hit
    - real WebGL / GLSL shaders, 2D-canvas generative art, GSAP + ScrollTrigger + Lenis, SVG trim-path / Lottie
    - CSS scroll-driven animations, View Transitions, container queries, backdrop-filter depth, a custom cursor — all self-contained, no framework
    - so research the impressive end of what these can do, not static-mockup galleries

  + The taste filter
    - cream of the crop only; skip trend-chasing and template packs
    - look for the details-only execution, and read the "what's next" undertone early — before it peaks
    - the funnel lenses must cite live source URLs, so collect the links as you go

---

## Theme-personality briefing checklist

Quick per-project questions to pin the personality before a build. Answering them is what keeps a theme from being skin-deep decoration.

  + **Motion Personality** — the signature easing, timing, and transition style
  + **Interaction Character** — how it responds to input: playful, precise, or organic
  + **State Communication** — the visual language for each state (idle, active, loading, done)
  + **Error Personality** — how problems are voiced, in the theme's voice, not a generic red toast
  + **Loading Character** — wait states that keep the immersion (a load counter as a typographic event, not a spinner)
  + **Success Celebration** — the achievement beat, matched to the theme's energy (a quiet settle vs confetti)
  + **The Metadata treatment** — how small print renders in this world (luggage tag / code comment / museum placard)

---

## Visual-feedback vocabulary

Shared language for iteration rounds — precise words that move the design instead of vague "make it pop."

### Lead with the concept, not the pixel

  + If it feels generic, the concept is too weak — strengthen the metaphor or point-of-view before touching colors
  + Get the motion language and type system right once; per-section polish is cheap after that
  + Push the two hardest pieces (a real shader, a full cursor system) last and on purpose — name them or they get under-built

### The lexicon

  + Tempo and easing
    - "more languid — let it breathe" · "kill the bounce, give it weight" · "this is twitchy — calm the entrances"
    - "reserve the spring for one place only"

  + Meaning and restraint
    - "make it meaning-bound — what claim does this interaction prove?"
    - "this reads as slop because ___ (flat / decorative motion / one trendy sans / rainbow accent)"
    - "reduce the spectacle, raise the orientation" (for tools — say what changed, don't perform)

  + Depth and texture
    - "it's too flat and frictionless — add grain and a real plane of depth"
    - "the accent is scattered — make one token carry all the structural color"

  + Type and system
    - "the voices don't disagree enough — cross a boundary (serif × mono)"
    - "these devices feel one-off — make eyebrows/numerals/captions a consistent system"

---

## Anti-slop acceptance checklist

Paste this block into a brief as acceptance criteria. It is the compressed form of the craft bar in `.agents/_DESIGN/INTERACTIVE_DESIGN_LANGUAGE.md`.

```
Acceptance criteria — treat as a checklist:
- Every section advances the concept; motion serves the story, not the reverse.
- Every interaction proves a claim; no decoration-only effects.
- A type system with tension (voices that cross a boundary); one structural accent.
- Tactile texture and real depth; never flat/frictionless.
- Calm by default; one ambient loop per scene; springiness reserved for one place.
- At least one easter egg / detail that rewards attention.
- Consistent system devices (eyebrows, numerals, captions, status encodings).
- Intentional asymmetry and edge-anchoring over centered-and-floating defaults.
- Real prefers-reduced-motion fallback, keyboard reach, held contrast.
- GPU-light and jank-free.
```

---

## Changelog

- **v1.0.0** (2026-07-09) — first version. The two-input principle, the nine levers (with scale-down notes), the theme-personality checklist, the feedback lexicon, and the paste-ready acceptance checklist. Generalized from the Fable prompt playbook; theme-personality descriptors salvaged from the retired swarm ui_component spec.
