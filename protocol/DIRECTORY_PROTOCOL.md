# Directory Protocol — names, versions, and what survives

What to call a file, what number to give it, where it goes, and which files get kept forever versus renamed forward. Read this before creating any document in a project.

---

## Where things live

```
assets/docs/
├── archive/                          find the current doc by looking for the highest version
│   ├── images/                       screenshots for feedback and planning
│   ├── resources/                    service docs gathered during planning
│   │   ├── {SERVICE}_FULL_LLM.txt
│   │   └── {SERVICE}_API_DOCS.md
│   ├── v1_0/                         a new subdirectory for every MINOR
│   │   ├── v0_0_1_UPDATE.md          the concept sketch that started it
│   │   ├── v1_0_0_IMPLEMENT.md       first session's plan
│   │   ├── v1_0_1_FEEDBACK.md        Sean's review of it
│   │   └── v1_0_1_IMPLEMENT.md       feedback folded in
│   ├── v1_1/                         deepening sessions
│   ├── v1_2/                         formal gate opens — addendums split out, prompts generated
│   │   ├── v1_2_0_IMPLEMENT.md
│   │   ├── v1_2_0_ADDENDUM_DESIGN.md
│   │   ├── v1_2_0_ADDENDUM_TESTING.md
│   │   ├── v1_2_0_REVIEW_PROMPTS.md
│   │   ├── v1_2_0_GAP_REVIEW_A.md    kept standing, forever
│   │   └── v1_2_1_*                  the fold, one version up
│   ├── v1_3/                         condensed and moved to B/C/D
│   │   └── v1_3_0_GAP_REVIEW_{B,C,D}.md
│   ├── v1_4/                         gate cleared, execution opens
│   │   ├── v1_4_0_IMPLEMENT.md       after final cuts
│   │   ├── _RATIONALE.md             no version number
│   │   ├── _KICKOFF_PROMPT.md        no version number
│   │   └── v1_4_1_BUG_REPORT.md      bugs found after the build
│   └── v2_0/
│       └── FUTURE_*.md               good ideas caught in the moment
├── research/                         only for business-grade research
├── GOALS.md                          what the project is FOR — accumulating
├── PROJECT_NAME.md                   architecture, current state, pitfalls (renamed per project)
└── BRAND.md
```

`assets/docs/` is the path. Older projects used a bare `docs/` and some documentation still repeats that — the template and every recent project use `assets/docs/`, and that is the standard.

---

## Filenames

**Planning a build**
- `v0_0_1_UPDATE.md` — the concept sketch or high-level requirements that start a build
- `v1_0_0_IMPLEMENT.md` — the plan; iterated every session
- `v1_0_1_FEEDBACK.md` — Sean's commentary on a plan, to be folded in
- `v1_0_2_BUG_REPORT.md` — bugs, gaps, and details from a build, to be addressed
- `FUTURE_<concept>.md` — an idea for a later build; gets a version number once the build catches up to it

**Running the gate**
- `v1_0_0_ADDENDUM_DESIGN.md`, `v1_0_0_ADDENDUM_TESTING.md` — same version as their IMPLEMENT, always
- `v1_0_0_REVIEW_PROMPTS.md` — current-only, regenerated each round
- `v1_0_0_GAP_REVIEW_{A,B,C,D}.md` — one per pass, kept standing
- `_RATIONALE.md`, `_KICKOFF_PROMPT.md` — written at the end, no version in the name

**Anything else** follows the same shape, using the version number to place it in the development cycle: `v4_0_7_GPT_SCHEMA.txt`, `v0_2_1_CD_DESCRIBE_PROMPT.md`, `v4_0_9_CD_HANDOFF.md`.

---

## Versioning

**One counter, `vMAJOR.MINOR.PATCH`, for the life of the project.** It starts at the first IMPLEMENT draft and runs continuously through planning rounds into shipped releases. It is an internal artifact that serves the work — not a customer-facing release number.

- **MAJOR** — architectural rewrite, deployment-target change, a breaking external change, or the plan-to-execution boundary after final cuts.
- **MINOR** — a new feature or capability shift, a breaking-but-internal change, or opening a new review phase in a fresh directory.
- **PATCH** — a fold, a bug fix, a doc-only update, a completed deepening session.

A higher bump resets the lower ones to zero. **No change, no bump**, and the number tracks changes regardless of what caused them.

**Plan version IS ship version.** A gate-cleared `v5_0_3_IMPLEMENT.md` ships under git tag `v5.0.3`. Numbers are not reserved or reset for releases — that is a habit from when versions were dressed up for users, and our lifecycle is mostly planning, so planning gets the same machinery. Each file's header says whether it is a planning revision or a ship artifact; trust the header, not the filename.

**Long gate loops get a MINOR boundary per phase**, so each phase keeps its own directory and a self-contained trail: the A loop in `v1.2.*`, B/C/D opening at `v1.3.0`, execution opening the next MAJOR. The boundary is a **copy** into the new directory — the old one keeps its terminal state as the phase record. Nothing is renamed across it.

**Delimiters:** dots everywhere — `v3.1.2`, git tags, commit messages — **except filenames**, which use underscores, because dots in filenames cause tooling problems. Git tags are pure numeric: `v3.1.2`, never `v3.1.2-fix`.

---

## What is kept and what is renamed

**Living planning documents are current-only through the gate.** The IMPLEMENT, its addendums, and the review-prompt file get **renamed** to the new version with `git mv` so history is preserved and the directory does not fill with near-duplicates. Git and descriptive per-file commits hold the superseded state.

**Terminal records are kept standing and never renamed.** Every `GAP_REVIEW_<angle>.md`, every `BUG_REPORT`, every `FEEDBACK`. They get cited forward, and they are the visible trail that the rigor actually happened.

**Three carve-outs where you keep a copy instead of renaming:**

1. **Early planning and human feedback.** Before the formal gate, the original genuinely is valuable context — a `v1_1_4_IMPLEMENT.md` sitting next to `v1_1_5_IMPLEMENT.md` shows what changed and why. Copy first, then edit the copy. This is the opposite of the gate-loop rule, and deliberately so: during the gate the valuable information lives in the `GAP_REVIEW` files, so keeping every IMPLEMENT is just clutter.
2. **A condense or whittle pass.** When a document is substantially rewritten rather than folded, keep a diffable pre-condense copy so Sean's inline notes are not silently lost.
3. **Never strand an empty directory.** When work leaves a `vX_Y/` for the next one, leave a copy of that directory's final-state living documents behind. Standing records usually cover this; the rule is for the case where a directory would otherwise empty out.

**Dead-end *decisions* stay in the document.** A future agent should read a live decision against the one it replaced. This is a content rule and it is the anti-mixed-truth rule's sibling — distinct from whether old version *files* are kept.

---

## The two master documents

Outside the archive, and both living:

- **`assets/docs/PROJECT_NAME.md`** (renamed for the project) — architecture, current state, design system, pitfalls. Updated whenever a non-trivial change ships.
- **`assets/docs/GOALS.md`** — what the project is for. Accumulating.

**Reference content — schemas, glossaries, diagrams — belongs in `PROJECT_NAME.md` or `archive/resources/`, never in the IMPLEMENT.** That is a forcing function that keeps the architecture document honest.

**Resolving a conflict between them:** a *past* IMPLEMENT disagreeing with `PROJECT_NAME.md` → the architecture doc wins, it is the living one. The *current* IMPLEMENT disagreeing with it → the IMPLEMENT wins, and the architecture doc was probably neglected — update it.

**Never create an archive directory at major-version level.** `v3_0/`, never `v3/`.
