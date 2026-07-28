# v[X.Y.Z] Implementation Plan

**Initiative**: [what this initiative is]
**Revision driven by**: [initial draft / post-feedback / post-cold-review / gap-review fold / final cuts]
**Required reading first**: `assets/docs/PROJECT_NAME.md` · `assets/docs/GOALS.md` · `README.md` · [any addendums] · [`archive/resources/*` as applicable]
**Addendums**: [`vX_Y_Z_ADDENDUM_DESIGN.md` · `vX_Y_Z_ADDENDUM_TESTING.md` — these are part of this build, not references]
**If you find missing context**: the architecture doc is living — confirm with Sean and update it. Do not paper over the gap here.

**This plan is built around `GOALS.md`, end to end.** The goals are what the build is for — every slice below should trace back to one, and anything the goals call for that no slice delivers is a gap, not an omission by design. They are also the lens every review reads through, self-review and formal gate alike.

---

## SETUP

Human-present items only. Everything here is done with Sean in chat, facilitated by this orchestrator, during planning — never handed to a later agent and never scattered into the phases below.

Anything that takes under three minutes does not belong here; it gets done now. Mark each remaining item ✓ with the date as it lands.

**This block is EMPTY before execution opens.** By the time an execution orchestrator reads this document, this section is a record, not a task list — it exists so the executor never has a reason to stop.

- [ ] [item — what it is, what Sean needs to click or approve, what the agent drives]

---

## Roadmap — coarse direction, NOT a build queue

[Where this initiative is headed. Brief. These are directions, not version-ships and not execution units. Detailing all of this to executable depth is the failure mode, not the goal.]

---

## Imminent slice — [name]

[The next coherent execution-boundary chunk, detailed to executable depth: phases, `file:line` specifics, the exact current code and the exact replacement for every edit, verification, rollback, and the subagent groupings the execution orchestrator starts from.]

[Sized by execution boundary — a subsystem, a layer, a file cluster — never by feature or version unit. A slice can be large when that is the coherent boundary.]

[The builder LOCATES and APPLIES. It decides nothing. Every decision here is already made.]

---

## Later — direction only

[Bulleted direction for what follows. Detail arrives as a slice approaches the gate, not before.]

---

## Cross-references

- Architecture, schemas, glossary → `assets/docs/PROJECT_NAME.md`
- What this project is for → `assets/docs/GOALS.md`
- API docs and service references → `assets/docs/archive/resources/`
- Filenames, versioning, directory layout → `~/.agents/protocol/DIRECTORY_PROTOCOL.md`
- Branching, deploys, environment keys → `~/.agents/protocol/GIT_AND_DEPLOY.md`
