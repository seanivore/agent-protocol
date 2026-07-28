# Memory Routing — where a fact belongs

Before you write anything down that is meant to outlive the session, decide which tier it belongs to. Put it in the wrong one and it either will not be there when someone needs it, or it will load into every unrelated session forever.

Route by two questions: **who needs this**, and **does it have to travel** — to another machine, another repo, or another person.

---

## The tiers

**`~/.agents/` — the method.** How we plan and build: the protocol, the gap-review procedure, naming and versioning, git and deploy discipline, the design method, the reference guides. One canonical copy, git-versioned, and the only tier that reliably reaches another machine or another repo. Anything that must be portable protocol goes here. Nothing project-specific does.

**`~/.agents/DEVELOPER_PROFILE.md` — the human.** Who Sean is, how he thinks, how he wants to be communicated with, and the posture expected of you. Stable across every project. Not a place for project facts.

**`~/.claude/projects/<project>/memory/` — what you learned about one project.** Machine-local auto-memory, loaded only in that project, derived from one git repository so every worktree shares it. Build commands, debugging insights, gotchas, decisions, corrections Sean gave you here. Keep `MEMORY.md` to one line per entry and push detail into topic files — only the first 200 lines or 25KB of the index loads, and anything past that is silently dropped. This tier does not travel: it is gone on another machine.

**`<project>/assets/docs/PROJECT_NAME.md` — the architecture.** The project's current state, structure, design system, and pitfalls. Living: updated whenever a non-trivial change ships. Travels with the repo, and it is what every cold reviewer reasons from — which is why letting it go stale poisons reviews long after the fact.

**`<project>/assets/docs/GOALS.md` — what the project is for.** Accumulating, never written once. The plan is built around it and every review reads through it.

**Git history — what actually happened.** Frequent, descriptive, per-file commits. There is no session log, no build report, no completion write-up. If you want a future agent to know a change was made and why, that is what the commit message is for.

---

## Routing traps

**Project facts drifting into the method.** A gotcha about one client's API does not belong in `~/.agents/` — it would load for every unrelated project forever. It belongs in that project's auto-memory or its architecture doc.

**Portable knowledge stranded in auto-memory.** A reusable technique or a piece of measured calibration data has no perfect home. Prefer a clearly labelled reference document in `~/.agents/references/` over stuffing it into the protocol documents, which stay pure method — and over auto-memory, which will not travel.

**Anything you put in an always-on file costs every session.** `AGENTS.md` and `DEVELOPER_PROFILE.md` are read at the start of every session in every project. Short and durable belongs there. Narrow or bulky does not.

**Writing a fact down twice.** Two copies drift, and then an agent has a known-wrong fact sitting next to the right one — the exact thing the no-mixed-truth rule exists to prevent. One fact, one home, and a pointer from anywhere else that needs it.
