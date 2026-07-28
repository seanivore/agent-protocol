# Interactive Design Language

**Version**: v1.0.0 · **Last Updated**: 2026-07-09
**Purpose**: the reusable vocabulary for directing interactive and motion design — the WHAT you feed a design funnel and hand to Claude Design. It is not a template and not a style; it is a set of dials and a gallery of starting points. Pick a lean per axis, one or more named starts, and an archetype's motion budget, and you have a coherent, deliberately-different direction.
**Companions**: `.agents/_DESIGN/INTERACTIVE_DESIGN_PLAYBOOK.md` (how to wield this), `.agents/_DESIGN/DESIGN_FUNNEL.md` (the funnel that consumes it), `.agents/_DESIGN/CLAUDE_DESIGN_COLLAB.md` (the handoff to Claude Design).

---

## How to remix this

  + The doc has three moving parts and one method
    - the axes are dials — each names a spectrum you set a value on
    - the technique library is the parts bin — named, reusable moves
    - the divergence palette is the gallery — named aesthetic worlds to start from
    - the method: pick a lean per axis, one or more starts, an archetype's motion budget → a direction

  + Two places it gets used
    - upstream of the funnel: it seeds the research lenses and the named directions the funnel renders (see `.agents/_DESIGN/DESIGN_FUNNEL.md`)
    - handed to Claude Design as the design-system reference — "match this vocabulary and these techniques, not any example's content"

  + The one-line seed for a direction
    - "a [Lineage] interface that feels like [Metaphor], moving at [Tempo], triggered by [Trigger]"
    - example: "a Cyber-Noir interface that feels like a submarine sonar station, moving with weight, triggered by state"

  + Divergence is the point
    - the same content should be able to produce worlds that would clash if merged — that clash is the signal you diverged enough
    - to get genuinely different results, change the *start* and the *interaction model*, not just the palette

---

## House taste — the floor every direction stands on

Every start, axis, and technique here operates inside one non-negotiable taste. Read this before choosing anything; it is the constraint the whole palette lives within.

  + The default is classic, timeless, restrained — less is more
    - the baseline is quiet; expression comes from motion and detail, not from heavy or loud aesthetics
    - build the floor restrained on purpose: it is far easier to ask for MORE than to ask for less, so a direction starts spare and adds only what earns its place

  + The dual test — pass both at once
    - (A) never turn anyone away for it being "not their style" — the work must feel open, not niche
    - (B) never lose the design snob — the details must reward the most demanding eye
    - passing both is well-executed *scope*, not a signature look; it is what made Apple a design leader before it traded cognitive-load discipline for spectacle

  + Loud lineages are welcome — details-only
    - cyberpunk, neon, glass, maximalism and the rest are on the table, but only in their most subtle, innovative, tasteful form — the "devil in the details," never the heavy or campy version
    - the buzzy undertone of what is next belongs in the details, read early — never the mainstream trend at its peak (by the time everyone argues for it, it is done)
    - glassmorphism, for one, earns a place only as an innovative, details-only touch — never as the whole surface

  + Constrain by dislikes, not likes
    - a brief that says what to AVOID limits the work less, and teaches more, than one that dictates what to include
    - so lead a spec with the anti-list; keep the positive vision light unless it is genuinely fixed

---

## The axes

Set each axis deliberately. Left it unset and the model fills it with the era's default — which is where slop comes from. Each axis is a spectrum; the value can sit anywhere along it.

### Motion axes

  + **Tempo** — how fast the whole thing feels
    - languid / still / unhurried ↔ kinetic / snappy / urgent
    - reads as: calm and confident (slow) vs alert and energetic (fast)

  + **Motion trigger** — what causes movement
    - ambient (autonomous loops) · scroll-linked (scrubbed) · pointer (hover/drag) · state-and-data (a value changed)
    - a direction usually leans on one or two; naming which is half the motion identity

  + **Easing character** — the single biggest taste fork
    - weight (ease-out, decelerate to rest, no bounce) ↔ bounce (spring, overshoot, elastic) ↔ mechanical (linear, instant, stepped)
    - "the jelly era is over for serious tools" is a real position; so is playful spring — but pick one on purpose
    - reads as: composed (weight) vs friendly/toy-like (bounce) vs machine/industrial (mechanical)

  + **Scroll continuity** — how the page moves under a scroll
    - smooth-inertial (Lenis-class) · native · paginated / snap · horizontal-tangent (a beat that turns sideways)
    - scrubbed reveals (bound to scroll offset, replay on scrub-back) vs fire-once-on-enter is a sub-choice here

  + **Timing anchors** — rough reference so "fast/slow" is not read-dependent
    - micro / instant swap: under ~80ms · snappy UI: ~150-250ms · standard reveal: ~400-700ms · section settle: ~700ms-1.5s
    - languid leans to the long end of each band; kinetic to the short end

### Surface axes

  + **Depth and space** — how many planes exist
    - flat ↔ layered parallax ↔ a floating card over a blurred live backdrop ↔ true 3D / WebGL / Z-axis navigation
    - reads as: honest-flat vs cinematic-deep

  + **Texture and finish** — the material the pixels imitate
    - matte paper / film grain · glossy glass / backdrop blur · neon glow / scanlines · editorial print · raw concrete
    - flat and frictionless is the number-one AI-slop tell; naming the opposite is the fix

  + **Density and rhythm** — how much sits in a viewport
    - airy and generous (14vh between beats) ↔ dense and utilitarian (NYT-dense, hairline dividers)
    - density is archetype-driven: a trail wants air, a trading desk wants density

  + **Type-voice tension** — how many faces and how they disagree
    - one voice (recessive) ↔ two ↔ three that cross a boundary (display serif × mono × humanist sans)
    - the tension between voices is the brand; a signature title device (roman lead word + italic accent word) lives here
    - forbid the monoculture: not Inter/Roboto/Poppins at one weight

  + **Color discipline** — how color carries meaning
    - one structural accent doing all the work ↔ a small system ↔ multi-hue
    - drive the theme from one token so a single swap re-themes everything (this is what makes an easter-egg recolor feel total)

### Feel axes

  + **Feedback intimacy** — how alive the interface feels to touch
    - system-quiet (nothing moves unless asked) ↔ responsive-alive ("life follows you" — the cursor trails growth/ink) ↔ playful / gamified (celebration, confetti, sound)

  + **Legibility ↔ expression** — the Safe-to-Avant-Garde tension at the pixel level
    - functional and immediately legible ↔ expressive and slightly ambiguous (intrigue over instant clarity)
    - dashboards live near legibility; art installations live near expression; know where you're planting
    - content that IS an accessibility artifact (a transcript, form data, medical info) pins hard toward legibility no matter the chosen start

  + **Interaction model** — the paradigm for moving through the whole thing
    - the "OS": windows, taskbars, draggable elements
    - the "Deck": spatial cards, swiping, tossing elements physically
    - the "Terminal": keyboard-driven, command-line input
    - the "Canvas": infinite pan and zoom, zooming into detail (Miro-style)
    - the "Feed": vertical velocity, snap-scroll, high-speed consumption
    - the "Document": narrative top-to-bottom scroll (Fable, RIJ)
    - the "Form-flow": one focused task carried step by step
    - changing this axis is the fastest way to a genuinely different result — most redesigns only touch surface axes and stay recognizably the same product

### Three framing verbs to ask of any direction

  + **Typography as Voice** — the font choice is half the vibe
    - Share Tech Mono vs Playfair Display vs Inter are three different personalities before a word is read

  + **Motion as Material** — how do things move, physically
    - heavy and industrial, or light and instant? the answer should match the brand, not the trend

  + **The Metadata problem** — how does this world render its small print
    - a date, a count, a label — as a luggage tag? a code comment? a museum placard? the answer proves the theme is real, not skin-deep

---

## Technique library

Named, reusable moves. Each: what it is, the feel it creates, when it fits, and the implementation family. Seeded and generalized from the Fable teardown, the RIJ brief, and the HyperFrames motion docs — but not limited to them.

### Scroll

  + **Smooth / inertial scroll** — eased scroll position drives everything
    - feel: the whole page has mass and glides
    - via: Lenis, wired into the animation ticker

  + **Scroll-linked (scrubbed) reveal** — animation progress bound to scroll offset
    - feel: the reader's scroll *is* the animation; scrub back and it replays
    - via: GSAP ScrollTrigger `scrub`, or CSS scroll-driven animations

  + **Pin + scrub** — a section holds while its content resolves
    - feel: a held breath; time stops for a beat
    - via: ScrollTrigger `pin` / `position: sticky`

  + **Horizontal tangent** — vertical scroll turns sideways for one stretch
    - feel: a fork in the path; a book-spread
    - via: map scroll to `translateX` / `xPercent` on a pinned track

  + **Multi-rate parallax** — layers move at different speeds
    - feel: real depth between foreground, mid, background
    - via: per-layer scroll factors

### Type

  + **Mask / baseline reveal** — a word rises through a clipped baseline
    - feel: type arriving with intent, not fading in
    - via: `overflow:hidden` line-mask + `translateY`, or `clip-path`

  + **Scrubbed read-along** — words darken to ink in reading order as you scroll
    - feel: the scroll performs the act of reading (karaoke, not typewriter)
    - via: per-word spans, color/opacity mapped to scroll progress

  + **Kinetic typewriter** — text types with human-jittered cadence
    - feel: something is being written live
    - via: char emitter with randomized delay + blinking caret

  + **Self-writing script** — a signature line draws itself like a hand
    - feel: intimate, handmade (the Apple "hello" trim-path)
    - via: SVG stroke trim-path / Lottie

  + **Autoplay rotator** — a display word cycles through variants
    - feel: demonstrates a claim in the medium ("I think in every language")
    - via: interval swap, script-matched faces

  + **Marquee / ticker** — a string loops horizontally
    - feel: broadcast, editorial energy
    - via: CSS keyframe `translateX` loop, seamless wrap

### Cursor and pointer

  + **Inertial / magnetic cursor** — a custom pointer lerps toward the mouse
    - feel: the interface is alive and aware of you
    - via: pointer tracking + spring lerp; hide native cursor

  + **Signature trail** — the cursor leaves something behind
    - feel: presence and consequence (Fable trails ink; RIJ trails growth)
    - via: decaying canvas particles / instanced sprites; progressive-enhancement with a no-op fallback

  + **Proximity force field** — nearby elements react to the pointer
    - feel: a living diagram; content that means something
    - via: canvas/WebGL particles with pointer-proximity links + repulsion

### Canvas and generative

  + **Reaction-diffusion / fluid** — a real shader simulates a material
    - feel: highest-craft "show your work"; the material is genuinely live
    - via: WebGL ping-pong FBO fragment shader

  + **Flow-field ink** — generative art that never repeats
    - feel: proof of uniqueness (a counter that increments per generation)
    - via: 2D canvas / p5 noise-curl field, reseed on click

### Transition

  + **Clip-path curtain** — a wipe dismisses or reveals a layer
    - feel: a theatrical cut between states
    - via: `clip-path` / `inset()` tween

  + **Scroll-linked collapse** — a full-bleed element crops into a framed figure
    - feel: a photographic breath resolving into structure
    - via: scroll-mapped scale/crop

  + **View-transition morph** — one view flows into the next
    - feel: continuity instead of a hard reload
    - via: the View Transitions API / layered cross-fade

### State and data

  + **State-driven layout transition** — the UI re-forms when data changes
    - feel: orientation — you see *what* changed and *where*
    - via: FLIP animation, view transitions

  + **Count-up / settle** — a number rolls or eases to its value
    - feel: credibility without a dashboard chrome
    - via: tweened value on reveal (reserve for values that read as measured, not for `∞`/`24-7`)

  + **Row-LED / field-ring encoding** — state shown as a colored edge or ring
    - feel: status you read at a glance, color-only
    - via: a token-colored border on the changed element

  + **The "Live Line"** — a colored edge marks a piece's live/staged state
    - feel: the same signal reused everywhere becomes a language
    - via: a 4px accent left-edge; same color splits a two-speed editor (from the everlastings portal)

### Input and processing

  + **Drop-zone states** — a target that shows it can receive
    - feel: the interface invites the file and confirms the catch
    - via: dragover/drop handlers toggling accept / reject / hover classes; a clear default, hover, and rejected state

  + **File-accept ritual** — the moment of ingestion gets one beat
    - feel: the input landed and something has begun (a card settles in, a reel spins, a waveform forms)
    - via: a short entrance on the accepted file, then an immediate handoff into the processing state

  + **Format / validation feedback** — wrong input is caught in the theme's voice
    - feel: the tool is on your side (Error Personality, not a generic red toast)
    - via: inline state on the drop-zone; name the fix, not just the failure

  + **Sustained / indeterminate processing** — a long, unknown wait stays alive
    - feel: the machine is working, not frozen — the wait keeps the theme's character
    - via: an ambient processing loop or a typographic progress event (a load counter, a streaming partial result), never a bare spinner; save count-up/settle for the final measured values

### Texture

  + **Tactile grain** — noise over plates and canvases
    - feel: anti-flat, physical
    - via: SVG `feTurbulence` overlay or a low-opacity noise texture

  + **Backdrop-blur card** — the app floats over a defocused live backdrop
    - feel: depth, a "device / first-edition" object
    - via: `backdrop-filter: blur()` + radius + shadow

---

## Archetype map

The same axes apply to every product, but the *purpose* motion serves changes completely. Set a motion budget by archetype: spend it where it advances the job, and treat the anti-patterns as forbidden.

### Scroll-narrative / immersive marketing

  + Purpose: make a stranger *feel* something and want in (Fable, RIJ)
  + Fitting moves: scrubbed reveals, pin + Ken Burns, horizontal tangent, signature cursor, one ambient loop per scene, meaning-bound interaction per section
  + Anti-patterns: a slideshow of hard cuts; motion with no narrative reason; a particle storm
  + Motion budget: high — motion *is* the content; but restrained (calm by default, one big beat per section)

### Single-task / single-form app

  + Purpose: carry one flow start to finish with confidence (the docker-transcriptions SPA; a survey form)
  + Fitting moves: state transitions, upload/progress feedback, a success ritual at completion, contextual reveal of advanced options
  + Anti-patterns: scroll spectacle; ambient loops that distract from the task; motion that delays the user
  + Motion budget: low and functional — motion confirms, orients, rewards; never performs

### Practical dashboard / CMS

  + Purpose: let someone manage data quickly and trust what they see (the store admin)
  + Fitting moves: state-driven layout transitions, row-LED/field-ring status, the Live-Line pattern, weight-not-bounce easing, dense rhythm
  + Anti-patterns: bouncy springs on every control; decorative motion; anything that slows a repeated action
  + Motion budget: minimal — motion = orientation and state change, measured in milliseconds

### Data-relationship / decision dashboard

  + Purpose: reveal relationships in mass data so a decision becomes obvious
  + Fitting moves: focus + context, view-transition between framings, proximity force fields on nodes, count-up on measured values, the Canvas interaction model (pan/zoom)
  + Anti-patterns: chartjunk animation; motion that hides the data; spectacle over legibility
  + Motion budget: purposeful — every motion should make a relationship easier to read

### Mobile data-collection

  + Purpose: collect simple, honest input on a phone in the field (field-findings)
  + Fitting moves: thumb-reach layout, one-question-at-a-time cadence, haptic-like feedback, a calm non-leading tone, snap between steps
  + Anti-patterns: dense desktop chrome; leading visual emphasis that biases an answer; heavy motion that drains battery
  + Motion budget: low — motion paces the user and confirms input; the design must stay neutral

### When a product spans two archetypes

  + Many products change archetype between phases — respect both budgets in sequence
    - a transcription tool is a single-form app on the way IN (drop a file, low motion, no spectacle) and a Document on the way OUT (the transcript is a real reading artifact — a scrubbed read-along and a colophon fit)
    - a survey is a Form-flow while answering and a Feed or dashboard when reviewing results
  + The rule: set the motion budget per phase, not per product
    - the loud, expressive moves live in whichever phase is the "artifact" — usually the output; the input phase stays quiet and functional
    - keep one type system and one accent across both phases so they read as one product

---

## Divergence palette

Named starting points — each a preset lean across the axes plus a signature-device seed and a touchstone. These exist so a funnel can render *several distinct worlds* for the same content. Pick a different start (and a different interaction model) and the result is genuinely different, not a recolor.

> These are starts to remix and diverge from — never templates to reproduce.

> Watch the archetype fit: a start's motion character must respect the archetype's budget. A bounce-heavy start (Soft Clay) fights a serious tool's minimal budget; a dense neon terminal fights a calm wellness site. When a funnel seeds starts, keep them within the archetype's budget — or break it on ONE Avant-Garde direction only, knowing that you're breaking it.

> And every start answers to House taste: the loud lineages (Cyber-Noir, Neon Data-Terminal, maximalist) are welcome details-only — the subtle, innovative read of them, never the heavy or campy one.

### The lineages (broad aesthetic worlds)

  + **Neo-Brutalism** — ugly-pretty, honest, loud
    - leans: mechanical easing, flat depth, dense, high-contrast, one raw accent
    - interaction model: Document or OS · metadata: as a code comment
    - suits: portfolios, editorial, tools that want to feel un-corporate

  + **Cyber-Noir / HUD** — a terminal that watches
    - leans: state-triggered, neon-glow finish, dense, mono type, glowing green/amber
    - interaction model: Terminal or OS · signature: scanlines, a live readout
    - suits: data dashboards, developer tools, anything "instrument"

  + **Solarpunk / Organic** — soft, breathing, alive
    - leans: ambient trigger, weight easing, layered depth, airy, evolved glass
    - interaction model: Document or Canvas · signature: breathing elements, cellular/Voronoi shapes
    - suits: wellness, nature, sustainability (RIJ lives near here)

  + **Corporate-Memphis Subverted** — flat precision with a sinister twist
    - leans: mechanical/snappy, flat, geometric, pastel-but-wrong
    - interaction model: Feed or Deck · signature: hyper-real or unsettling detail inside friendly forms
    - suits: brands that want to be noticed for breaking the friendly-startup mold

  + **Apple / Braun Minimalist** — grid perfection, zero clutter
    - leans: weight easing, restrained depth, airy, one or two voices, monochrome + silver
    - interaction model: Document or Form-flow · signature: absolute alignment, nothing extra
    - suits: premium products, hardware, anything selling calm confidence

  + **Retro-Skeuomorphic** — real-world texture and tactility
    - leans: pointer-triggered, weight easing, deep, tactile finish (leather/metal/paper)
    - interaction model: OS or Deck · signature: a scrollbar that looks like a physical slider
    - suits: playful tools, music/creative apps, anything that wants to feel handled

  + **Spatial / AR** — layouts that imply 3D
    - leans: pointer + scroll, deep/Z-axis, floating layers
    - interaction model: Canvas · signature: parallax planes, depth navigation
    - suits: showcases, spatial data, next-gen product marketing

### The worked starts (from real projects)

  + **Editorial First-Edition** — a printed autobiography (Fable, labelled example)
    - leans: scroll-triggered, weight easing, backdrop-blur card, three-voice type (Didone × mono × humanist), one coral accent
    - interaction model: Document with a horizontal-carousel beat · signature: eyebrows, roman-numeral chapters, colophon, a Konami re-theme
    - suits: narrative marketing, portfolios, anything with a point of view to argue

  + **Warm Naturalist Trail** — walking a forest path (RIJ v1, labelled example)
    - leans: scroll-linked + ambient, languid weight easing (no bounce), forest-layer parallax, paper/leaf grain, soft violet accent
    - interaction model: Document with one horizontal tangent · signature: a growing root-spine, a growth-trail cursor, drag-to-release ritual
    - suits: wellness, slow brands, practices that reward patience

  + **Weight-not-Bounce Studio Slate** — a serious tool with no jelly (everlastings, labelled example)
    - leans: state-triggered, weight easing, hairline depth, dense, near-monochrome indigo-slate with meaning-carrying shadow
    - interaction model: OS / dashboard · signature: the Live Line (colored edge), a thumb-anchored action dock that names the blocker
    - suits: admin panels, CMS, commerce tooling

  + **Neon Data-Terminal** — readouts, not pages
    - leans: state + ambient, mechanical easing, flat + glow, very dense, mono
    - interaction model: Terminal · signature: a live clock, streaming logs, color-coded status
    - suits: monitoring, ops, quant/finance dashboards

  + **Tactile Riso / Paper** — printed-zine warmth
    - leans: pointer-triggered, weight easing, flat-with-grain, medium density, two ink colors mis-registered
    - interaction model: Document or Deck · signature: halftone, paper texture, hand-set type
    - suits: culture, editorial, indie product

  + **Soft Clay** — friendly, rounded, playful
    - leans: bounce easing (used on purpose), soft depth, airy, rounded everything
    - interaction model: Feed or Form-flow · signature: squishy press states, pastel gradients
    - suits: consumer apps, onboarding, kid/education — the one place bounce earns its keep

### The ambition ladder

  + **Level 1 — Safe** — a polished version of a known style
    - a genuinely good dark mode, a clean minimalist; low risk, still craft

  + **Level 2 — Bold** — mix two lineages
    - Brutalist + Glassmorphism; Cyber-Noir + Editorial; the collision is the identity

  + **Level 3 — Avant-Garde** — invent a paradigm
    - a new interaction model that defies standard web usability but increases intrigue
    - run this on at least one funnel direction when the goal is to be memorable, not safe

---

## The craft bar

The tells that separate intentional, human-grade work from templated AI output. This is the reference version; the paste-into-a-brief checklist lives in `.agents/_DESIGN/INTERACTIVE_DESIGN_PLAYBOOK.md`.

  + **A reason for every element** — each section advances a concept; motion serves the story, never the reverse
  + **Interactions that mean something** — each interactive element dramatizes a claim, not decoration
  + **A type system with tension** — voices that cross a boundary, not one trendy sans at one weight
  + **One structural accent** — a single color doing punctuation, numerals, cursor, progress — not a rainbow
  + **Tactile texture and real depth** — grain, paper, blur, layered planes — never flat and frictionless
  + **Restraint** — calm by default, one ambient loop per scene, springiness reserved for one place
  + **Consistent system devices** — eyebrows, numerals, captions, status encodings that imply a system, not a one-off
  + **Intentional asymmetry** — edge-anchored, deliberately placed, over centered-and-floating defaults
  + **Reward for attention** — an easter egg, a "never repeats" generative moment, a detail that pays off a second look
  + **Accessibility as craft** — a real `prefers-reduced-motion` fallback, keyboard reach, contrast — not an afterthought
  + **Performance held** — GPU-light effects, no jank; a beautiful thing that stutters reads as broken

---

## Changelog

- **v1.0.0** (2026-07-09) — first version. Axes, technique library, archetype map, divergence palette (lineages + worked starts + ambition ladder), and the craft bar. Salvages the Aesthetic-Lineage and Interaction-Model taxonomies and framing verbs from the retired swarm-designing specs; generalizes motion vocabulary from the Fable teardown, the RIJ brief, and the HyperFrames docs.
