# Design Funnel

**Version**: v2.0.0 · **Last Updated**: 2026-07-21
**Purpose**: a **loose, per-situation tool** — multi-agent rendering runs that surface several distinct rendered options to rank and pull pieces from. It is deliberately NOT one fixed procedure: funnels are not one-size-fits-all, and each one is **planned on the fly** from two inputs, then scripted bespoke for that run.
**The two planning inputs** (know these before designing any funnel): **(1) what you're working with** — how much vision/palette/direction already exists — and **(2) what you need to figure out** — choosing between whole worlds? nuancing a decided look? surfacing one immaculate execution of a known surface? Once those two are clear, describe the funnel you want to the orchestrator/an agent, and it **authors a bespoke Workflow script for that run** — rounds, layers, agent counts, and models all sized to the job. `~/.agents/design/design_funnel.mjs` is a **worked example** of such a script (the four-round shape below), not THE engine.
**Companions**: `~/.agents/design/INTERACTIVE_DESIGN_LANGUAGE.md` (the axes + named starts to diverge across), `~/.agents/design/INTERACTIVE_DESIGN_PLAYBOOK.md` (how to brief), `~/.agents/design/CLAUDE_DESIGN_COLLAB.md` (the handoff after you pick).

---

## Who does what (this trips people up — read it)

  + **Claude Code (the orchestrator + its peer agents)** runs funnels. A funnel is filesystem + Workflow-tool + many-agents territory — it can only execute here.
  + **Claude Design NEVER runs funnels** — it has no system/file access and no peer agents. CD enters only at the very end of design planning, receiving **final specs + a complete build list of all the UI needed** (see `CLAUDE_DESIGN_COLLAB.md`). Nothing upstream of that ever goes to CD.
  + **The human** curates: ranks the rendered results, and — the norm, not the exception — **pulls the pieces they like from across results at every stage**. Expect a composite, not a single whole winner.

## When to reach for it

You want something nice, confirmed modern through research, but otherwise don't have a current specific vision. This could mean providing parts you already have like a palette, or types of potential palettes, but it could also mean providing a general vibe or archetype that should be aimed for. If you already can see exactly what you want, then you probably don't need a funnel, unless it is to get a concrete example and put into words what is only in the mind.

It also earns its cost on surfaces you'd never call design-led: a render-heavy funnel over a "boring" `/admin` panel for an online store once returned six similar results — **and one was immaculate and polished in a way no single attempt would have found**. Surfacing that one outlier is the tool's value.

---

## How it works — a worked example shape (not a fixed procedure)

The four-round shape below is what `design_funnel.mjs` implements and what the first real runs used. Treat it as a menu of proven rounds to size up or down (see Calibration) — a bespoke funnel might be render-only, might add a composite round, might run two small funnels in sequence.

### The rounds (as implemented in the example script)

Four rounds, run as a Workflow. ~two dozen agents; bounded; watch with `/workflows`.

  + **R1 — Research + Pitch** — parallel lenses, each web-grounded
    - angles: current-year trends (fresh vs stale) · palette + type + finish · motion + interaction · archetype-first · innovation/showcase
    - each returns a direction + an IA + one renderable HTML sketch + its sources
    - a compiler folds them into one corpus that *preserves* the distinct directions (does not pick a winner)

  + **R2 — Board Debate** — five exec lenses, each case → critique → rebuttal
    - Design, UX, Product, Brand, Engineering (Engineering holds a hard veto on anything not buildable in the stack)
    - the job is to STRENGTHEN each distinct direction and flag fatal flaws — NOT to collapse them into one

  + **R3 — Curate Directions** — the changed step
    - emits an ARRAY of N distinct named directions, each with its own concept, palette, type, motion, interaction model, IA, and component list
    - explicit instruction: keep them separate; if two collapse into the same idea, drop one and add a bolder alternative
    - this is where the old funnel grafted to one — it no longer does

  + **R4 — Render** — one artifact per direction (× clusters, if configured)
    - each direction rendered as self-contained HTML that opens in a browser, tagged by direction name
    - you rank *directions*

  + After the run (the main loop does this, not the script)
    - save each render to its own file and open it
    - rank the directions; sanity-check them against the raw corpus
    - carry the winner(s) into a Claude Design handoff (`~/.agents/design/CLAUDE_DESIGN_COLLAB.md`)

### Seed divergence through Language

The funnel only renders worlds as distinct as you seed. Two ways to drive it:

  + **Seed-driven (reliable divergence)** — recommended
    - list named starts in the spec's "§2 The bar" and paste them into `STARTS` in the script
    - R3 builds one direction per start, kept true to each — so you get, by construction, N genuinely different worlds
    - pick starts that differ on the interaction-model axis, not just color (a Terminal vs a Document vs a Deck)

  + **Emergent (exploratory)** — leave `STARTS` empty
    - R3 selects the N most distinct directions the lenses surfaced and names them
    - good when you want the research to suggest directions you would not have picked

  + Two modes, named
    - divergent-named-worlds: the default — render several, rank worlds
    - convergent-single: set `N_DIRECTIONS = 1` (or one start) if you deliberately want one — the old behavior, now opt-in

### Regarding peer-agents

Peer agents inherit the orchestrator's model and effort by default. What you can change:

  + **Model — freely overridable per agent**
    - in the Workflow script: `agent(prompt, { model: 'sonnet' })`; the script exposes a `MODELS` block per phase
    - with the classic Agent tool: the `model` param on the spawn
    - use it to run broad research cheaply and reserve a heavier model for the hardest synthesis

  + **Effort — per-agent inside a Workflow, inherited for classic subagents**
    - inside a Workflow script you can pass `agent(prompt, { effort: 'low' })` for cheap mechanical stages
    - a classic Agent-tool subagent inherits the session effort — you change its model, not its effort

  + **On which model is "best" for design — test, don't assume**
    - the retired swarm notes say only "Opus 4.5 or Sonnet, both good, want to experiment more" — there is no recorded finding that one beats the other
    - so treat model choice as a real, experiment-worthy lever per phase (e.g. try Sonnet on the render round one run, compare), not a settled rule

---

## The setup 

### Authoring a funnel spec

  + Start from images if words are the hard part
    - hand the orchestrator reference images, a mood board, or screenshots and have it translate them into the "§2 The bar" vocabulary — putting a vision into words is exactly what the planner is for, and it should never block starting
    - this is the "describe what you built" round-trip run the other direction: pictures in, vocabulary out
    - these are your *inspiration* references (translate them into the bar); keep them distinct from current-UI screenshots, which stay out of the funnel (see below)

  + Start from the template
    - copy `~/.agents/design/DESIGN_FUNNEL_SPEC.md` into the project (e.g. `assets/docs/design/DESIGN_FUNNEL_SPEC.md`) and point `SPEC_PATH` at it

  + Fill it from the Language
    - "§2 The bar" is where you choose the archetype, the motion budget, the axis leanings, and the named starts — all from `~/.agents/design/INTERACTIVE_DESIGN_LANGUAGE.md`
    - keep it self-contained: the funnel agents see only the spec, so embed the essential content and constraints

  + Whether the funnel agents need the Language doc themselves
    - default: no — keep the spec self-contained, so embed the concrete meaning of any named start or axis term the spec uses, not just its name (a lens agent should not have to go read a dictionary to render faithfully)
    - option: if you would rather reference than embed, tell the agents in the spec they may read `~/.agents/design/INTERACTIVE_DESIGN_LANGUAGE.md` for the vocabulary — but the spec must still stand alone

  + Keep the current UI out of it
    - do not feed the design agents the current-state screenshots — they design to the requirements, not the existing mess (keep those as your own reference)


### Orchestrator compacts, then activates

Discussion with the orchestrator should occur to plan the funnel spec, helping bake in whatever amount of vision does exist so that can be baked in and, if desired, plan what ways this should expand through the funnel research and design flow. Then the orchestrator should provide a compact arg, be compacted, and then that instance can execute the start of the funnel. They should keep project memories throughout. 

  + What a fresh instance needs
    - the scriptPath and the on-disk spec — nothing from the prior chat
    - every agent re-reads the spec itself, so a compacted or brand-new session runs it identically

  + How to run
    - `Workflow({ scriptPath: '~/.agents/design/design_funnel.mjs' })`
    - to resume after a pause or a script edit: `Workflow({ scriptPath, resumeFromRunId })` — unchanged agents return cached results, only new/edited ones re-run

  + The old bootstrap, modernised
    - the everlastings funnel shipped a "compact arg + first message" to re-seed a compacted instance; the `Workflow` tool's `scriptPath` + `resumeFromRunId` is the well-understood equivalent and needs no hand-written re-seed

### The script

  + Where the example lives
    - `~/.agents/design/design_funnel.mjs` — the worked-example R1–R4 script, multi-direction default
    - `~/.agents/design/DESIGN_FUNNEL_SPEC.md` — the per-project spec template it reads

  + Running the example as-is: what you edit (the block at the top of the script)
    - `SPEC_PATH` — the filled spec
    - `N_DIRECTIONS` / `STARTS` — how many worlds, and which named starts to diverge across
    - `STACK` — the build constraint the Engineering veto enforces
    - `MODELS` — optional per-phase model overrides
    - `RENDER_CLUSTERS` — one showcase per direction by default; add clusters to slice each direction into component sets

  + Authoring a bespoke script (the normal path)
    - state the two planning inputs (what you're working with / what you need to figure out), then describe the funnel you want — rounds, how many renders, what gets compared — and have the orchestrator/an agent write a new Workflow script modeled on the example
    - what carries over between funnels is not an engine but the **craft**: render-real-HTML always, keep directions distinct until the human ranks, preserve pitch sketches, expect a composed-from-parts winner, and the Calibration gotchas below

---

## Calibration — lessons from the first real run

Run one (the `workflow.august.style` case-study site): 26 agents · ~68 min · ~2M tokens. It worked, and it taught us how to aim it.

  + **Right-size the funnel to the job — this is the big one**
    - R1 (research) + R2 (board debate) are ~21 of the ~26 agents, and they exist to *choose between distinct worlds*
    - when the aesthetic is **already largely set** and you only want *nuanced-execution* variants, that machinery debates a direction that was never up for debate — nearly all the value lands in R4 (the renders)
    - **refining a look you've mostly decided** → research-light, shrink or skip the board debate, go render-heavy
    - **genuine open exploration** → run it full; that's what it's for

  + **Models — split by what the human actually judges**
    - `research: 'sonnet'` + `debate: 'sonnet'` (process rounds) · `curate` + `render` on Opus (the output a design snob ranks). Worked cleanly.

  + **`RENDER_CLUSTERS` is the apples-to-apples lever**
    - set it to ONE fixed component sheet so **every direction renders the SAME elements**
    - that's what lets the human compare on *nuanced detail* instead of gross direction — "pick the one with the best nuanced details, that's the money"

  + **Do not forget the R1 pitch sketches**
    - every research lens also returns a renderable HTML sketch (`pitches[].components`) — these are NOT just process exhaust
    - in run one, **the single best top-bar + typography execution in the entire funnel came from a *pitch sketch*, not a final render** (it was nearly missed)
    - extract them and show them next to the R4 renders

  + **Expect the human to compose a winner from PARTS**
    - not one whole winner — "the bar from #1, the color pass from #3, the card-fan from #4, re-grounded"
    - fold the picks into an explicit **composite-system doc** before the next render round, so the follow-on agents build one coherent thing

  + **Mechanics that will bite you**
    - the Workflow task `.output` file wraps the return value under **`.result`** — parse with a script, never read it into context (renders are ~25–50KB each)
    - render agents sometimes **leak a sentence of chatter above `<!doctype>`** and **write stray duplicate files** into the repo — strip the preamble, sweep the strays
    - render agents declare font stacks but **load no webfont at all** — so the type the human sees is a *system fallback, not a choice*. Either instruct them to actually load a face, or tell the human the type isn't a real signal yet.

  + **Rendered samples are non-negotiable**
    - a design-snob client cannot judge a direction from prose; a "peer-agent brainstorm" that returns *text concepts* misses the entire point. The funnel earns its cost precisely because it **renders**.

---

## Changelog

- **v2.0.0** (2026-07-21) — reframed per Sean: the funnel is a **loose per-situation tool, planned on the fly** from two inputs (what you're working with / what you need to figure out) and **scripted bespoke per run** — `design_funnel.mjs` demoted from "the fixed engine" to a worked example; added the **Who does what** section (Claude Code + peer agents run funnels; Claude Design never does — it receives only final specs + a complete UI build list; the human composes winners from parts at every stage, as the norm); added the admin-panel lesson (render-heavy funnels earn their cost even on boring surfaces — one immaculate outlier out of six similar results).
- **v1.1.0** (2026-07-14) — added *Calibration* from the first real run: right-size the rounds to the job (full funnel is for choosing between worlds, not refining a known look), the model split, `RENDER_CLUSTERS` as the apples-to-apples lever, don't-lose the R1 pitch sketches, expect a composed-from-parts winner, and the output-parsing / preamble / webfont gotchas.
- **v1.0.0** (2026-07-09) — first version, extracted from `DEV_RULES.md` and generalized from the everlastings portal funnel. Multi-direction rendering is now the default (R3 emits an array of named directions; R4 renders each); the funnel is spec-driven and re-runnable from a fresh instance via the Workflow tool; model/effort levers documented; ships the reusable script + spec template in `_TEMPLATES/`.
