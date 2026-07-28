// Design funnel — reusable Workflow script. MULTI-DIRECTION BY DEFAULT.
//
// Run in a FRESH/compacted session:
//   Workflow({ scriptPath: '.agents/_DESIGN/design_funnel.mjs' })
//
// Portability: every agent reads the product spec from disk (SPEC_PATH), so a new or
// compacted instance needs nothing from the prior conversation — just this scriptPath
// and the on-disk spec. To resume after a pause/edit: Workflow({ scriptPath, resumeFromRunId }).
//
// Flow:
//   R1 research + pitch (web-grounded lenses) + compile
//   R2 board debate (case -> critique -> rebuttal) — strengthens every direction, does NOT pick one
//   R3 CURATE N distinct NAMED directions (kept separate — the old CEO "graft to one winner" is gone)
//   R4 render EACH direction as real vanilla HTML — you rank directions, not slices of one winner
// Returns { directions, renders, debate, corpus, pitches }.
//
// Companion docs: .agents/_DESIGN/DESIGN_FUNNEL.md (how to run + author a spec),
//                 .agents/_DESIGN/INTERACTIVE_DESIGN_LANGUAGE.md (the axes + named starts to diverge across).

export const meta = {
  name: 'design-funnel',
  description: 'Divergent design-research funnel: research+pitch -> board debate -> curate N distinct named directions -> render each as vanilla HTML',
  phases: [
    { title: 'R1 Research + Pitch' },
    { title: 'R2 Board Debate' },
    { title: 'R3 Curate Directions' },
    { title: 'R4 Render' },
  ],
}

// ── EDIT PER PROJECT ────────────────────────────────────────────────────────
const SPEC_PATH = 'assets/docs/design/DESIGN_FUNNEL_SPEC.md' // the product spec every agent reads first
const N_DIRECTIONS = 3          // how many distinct directions to render (only used when STARTS is empty)
const STARTS = [                // named aesthetic starts to diverge across (from INTERACTIVE_DESIGN_LANGUAGE.md)
  // 'Cyber-Noir Terminal', 'Warm Naturalist Trail', 'Weight-not-Bounce Studio Slate',
]                               // leave empty to let R3 pick the N_DIRECTIONS most distinct directions itself
const STACK = 'vanilla HTML/CSS/JS (no framework/build); GSAP + ScrollTrigger + Lenis allowed'

const MODELS = {                // per-phase model override; undefined = inherit orchestrator. EFFORT always inherits.
  research: undefined,          // e.g. 'sonnet' for cheap, broad, web-grounded research
  debate: undefined,
  curate: undefined,            // e.g. 'opus' for the hardest synthesis
  render: undefined,            // e.g. 'sonnet' — historically strong at design render; test per project
}
// ────────────────────────────────────────────────────────────────────────────

const readSpec = `FIRST read the design spec at ${SPEC_PATH} in full — it is the design target: who it is for, the archetype, "the bar" (the chosen axes + named starts + motion budget), the hard stack constraint (${STACK}), the full feature/content set, and the deliverable. Confirm you read it.`

const PITCH_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['lens', 'direction', 'ia', 'components', 'sources'],
  properties: {
    lens: { type: 'string' },
    direction: { type: 'string', description: '200-350 words: proposed look/feel, palette intent, typography, density, interaction model, and motion language — buildable in the stated stack' },
    ia: { type: 'string', description: 'information architecture / section order, mobile-first' },
    components: { type: 'string', description: `ONE self-contained renderable HTML document (inline <style>) sketching 2-3 signature moves in this direction — ${STACK}, opens in a browser` },
    sources: { type: 'array', items: { type: 'string' }, description: 'URLs of the live current-year design sources consulted' },
  },
}

// R1 — research angles (generic; edit if a project needs different angles)
const LENSES = [
  { key: 'trends', brief: 'LENS — current-year design trends. Use WebSearch (load via ToolSearch if needed) for what is FRESH vs going STALE right now. Propose a direction that is current without chasing fads. Name specific trends + cite sources.' },
  { key: 'palette-type', brief: 'LENS — palette + typography + finish. Propose the color system (one structural accent doing the work), the type-voice tension, spacing/density, radii/shadows/texture. Quiet excellence, not camp. Cite sources.' },
  { key: 'motion-tactility', brief: 'LENS — motion + interaction language. Propose the easing character (weight vs bounce), triggers, and how EVERY control/section visibly responds, with reduced-motion support. Cite "micro-interactions / scroll animation" sources.' },
  { key: 'archetype-first', brief: 'LENS — the primary context and archetype. Design for the primary device and job first (see the spec archetype + motion budget), then adapt up/down. Propose the layout/nav/flow patterns that fit the archetype. Cite sources.' },
  { key: 'innovation', brief: 'LENS — innovation + showcase-worthiness. Propose one or two genuinely fresh, tasteful ideas that make a viewer say "I want that" — push toward Bold/Avant-Garde, not gimmicks. Cite standout sources.' },
]

phase('R1 Research + Pitch')
const pitches = (await parallel(LENSES.map((l) => () =>
  agent(`${readSpec}\n\n${l.brief}\n\nThen produce your PITCH per the schema: a design direction, an IA, and ONE renderable HTML sketch (inline <style>, 2-3 signature moves). Stack: ${STACK}.`,
    { label: `R1:${l.key}`, phase: 'R1 Research + Pitch', schema: PITCH_SCHEMA, model: MODELS.research }),
))).filter(Boolean)

const corpus = await agent(
  `${readSpec}\n\nYou are the R1 COMPILER. The ${pitches.length} lens pitches as JSON:\n${JSON.stringify(pitches)}\n\nCompile ONE reusable research+pitch corpus: the DISTINCT directions on the table (name them), the strongest trend findings (with sources), points of agreement + tension, and the candidate signature moves. Faithful + organized. Do NOT pick a winner and do NOT collapse distinct directions together — preserve the divergence.`,
  { label: 'R1:compile', phase: 'R1 Research + Pitch', model: MODELS.research },
)

const EXECS = [
  { key: 'design', role: 'Head of Design (aesthetics, craft, taste — distinctive + confident, not camp; is each direction genuinely different from the others?)' },
  { key: 'ux', role: 'Head of UX (usability, clarity, the primary job done well for the primary user)' },
  { key: 'product', role: 'Head of Product (does each direction cover every capability/section in the spec?)' },
  { key: 'brand', role: 'Head of Brand (does each direction commit to a coherent world + showcase-worthiness?)' },
  { key: 'eng', role: `Head of Engineering (is every move genuinely buildable in the stated stack — ${STACK}? hold a hard veto on anything that is not)` },
]

phase('R2 Board Debate')
const cases = (await parallel(EXECS.map((e) => () =>
  agent(`${readSpec}\n\nYou are the ${e.role}. The R1 corpus:\n${corpus}\n\nMake your CASE through YOUR lens: what each candidate direction must NAIL to succeed, and which are worth prototyping. The goal is to STRENGTHEN the distinct directions, NOT to collapse them into one. 250-450 words.`,
    { label: `R2-case:${e.key}`, phase: 'R2 Board Debate', model: MODELS.debate }).then((text) => ({ key: e.key, role: e.role, text })),
))).filter(Boolean)

const critiques = (await parallel(EXECS.map((e) => () =>
  agent(`${readSpec}\n\nYou are the ${e.role}. All board cases:\n${cases.map((c) => `### ${c.role}\n${c.text}`).join('\n\n')}\n\nCRITIQUE through your lens — where each direction is strong, where it is risky or fatally flawed, what it misses. Sharp + specific. Flag any direction that is really a duplicate of another (they should stay distinct). 200-400 words.`,
    { label: `R2-critique:${e.key}`, phase: 'R2 Board Debate', model: MODELS.debate }).then((text) => ({ key: e.key, role: e.role, text })),
))).filter(Boolean)

const rebuttals = (await parallel(EXECS.map((e) => () => {
  const mine = cases.find((c) => c.key === e.key)
  const againstMe = critiques.filter((c) => c.key !== e.key).map((c) => `### ${c.role}:\n${c.text}`).join('\n\n')
  return agent(`${readSpec}\n\nYou are the ${e.role}. Your case was:\n${mine ? mine.text : '(none)'}\n\nCritiques touching it:\n${againstMe}\n\nREBUT: concede what is fair, defend what holds, refine how to make each direction its strongest self. 150-300 words.`,
    { label: `R2-rebut:${e.key}`, phase: 'R2 Board Debate', model: MODELS.debate }).then((text) => ({ key: e.key, role: e.role, text }))
}))).filter(Boolean)

const N = STARTS.length || N_DIRECTIONS
const startInstruction = STARTS.length
  ? `Produce exactly ${STARTS.length} directions, one built from EACH of these named starts — keep each true to its start and genuinely distinct from the others, do NOT blend them: ${STARTS.join(' · ')}.`
  : `Select the ${N_DIRECTIONS} MOST DISTINCT directions worth prototyping. Keep them genuinely different (different interaction models / lineages / motion character), do NOT graft them into one winner. If two are basically the same, drop one and add a bolder alternative from a different lineage.`

const DIRECTIONS_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['directions', 'notes'],
  properties: {
    directions: {
      type: 'array',
      description: `the ${N} DISTINCT named directions to render — kept separate, never merged`,
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'concept', 'palette', 'typography', 'motion', 'interaction_model', 'ia', 'components_to_render'],
        properties: {
          name: { type: 'string', description: 'a short memorable name for this direction' },
          concept: { type: 'string', description: 'the one governing idea + look/feel/voice, 150-300 words' },
          palette: { type: 'string', description: 'the color system as concrete values/tokens' },
          typography: { type: 'string' },
          motion: { type: 'string', description: 'the easing character + motion language + how it is built in the stated stack' },
          interaction_model: { type: 'string', description: 'OS / Deck / Terminal / Canvas / Feed / Document / Form-flow' },
          ia: { type: 'string', description: 'information architecture / section order, mobile-first' },
          components_to_render: { type: 'array', items: { type: 'string' }, description: 'the signature components/surfaces R4 must produce for this direction' },
        },
      },
    },
    notes: { type: 'string', description: 'why these directions are distinct, and the biggest risk of each' },
  },
}

phase('R3 Curate Directions')
const curated = await agent(
  `${readSpec}\n\nYou are the CURATOR. Inputs —\n\nCORPUS:\n${corpus}\n\nCASES:\n${cases.map((c) => `### ${c.role}\n${c.text}`).join('\n\n')}\n\nCRITIQUES:\n${critiques.map((c) => `### ${c.role}\n${c.text}`).join('\n\n')}\n\nREBUTTALS:\n${rebuttals.map((c) => `### ${c.role}\n${c.text}`).join('\n\n')}\n\n${startInstruction}\n\nHonor the Engineering veto (buildable in ${STACK}). Output per the schema — a set of DISTINCT named directions, each with its own concept, palette, typography, motion, interaction model, IA, and the component list R4 must render. Do NOT produce a single grafted winner.`,
  { label: 'R3:curate', phase: 'R3 Curate Directions', schema: DIRECTIONS_SCHEMA, model: MODELS.curate },
)
const directions = curated.directions || []

// R4 render targets — default one showcase per direction. Add clusters to also slice each direction.
const RENDER_CLUSTERS = [
  { key: 'showcase', items: "the product's primary surface plus 2-3 signature components/moves that express this direction" },
  // { key: 'controls', items: 'a button (all states), a toggle, an input + select, a nav item' },
  // { key: 'pieces', items: 'a content tile with a state tag, the state badge set, a card container' },
]

phase('R4 Render')
const renderJobs = []
for (const d of directions) for (const c of RENDER_CLUSTERS) renderJobs.push({ d, c })
const renders = (await parallel(renderJobs.map(({ d, c }) => () =>
  agent(`${readSpec}\n\nBuild to THIS named direction — build it faithfully and do NOT blend it with any other direction:\n${JSON.stringify(d)}\n\nProduce ONE self-contained HTML document (single inline <style>, ${STACK}) implementing: ${c.items}. Real press/hover/focus/state responses, mobile-first, reduced-motion support. It must open in a browser and look finished. Return only the HTML document.`,
    { label: `R4:${d.name}:${c.key}`, phase: 'R4 Render', model: MODELS.render })
    .then((html) => ({ direction: d.name, cluster: c.key, html })),
))).filter(Boolean)

return { directions, renders, debate: { cases, critiques, rebuttals }, corpus, pitches }
