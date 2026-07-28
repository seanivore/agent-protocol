# Agent Protocol

A working method for building software with agentic tools, refined over about a year of real projects and rewritten from scratch in July 2026.

It rests on one inversion: **with today's tools, generating code is fast and cheap, so the plan is where the work is.** Roughly 90% planning, 10% building — as a measurement, not a slogan. Everything here is machinery for making that real.

---

## Start here

**[`AGENTS.md`](AGENTS.md)** is the entry point — the one document an agent reads at the start of every session. It is 177 lines, and it maps everything else.

The core of it, briefly:

- **Plan until it is *exclusively executable*.** The agent that builds it arrives with no prior context, looks nothing up, and decides nothing. It only locates and applies. If the builder has to decide something, the plan failed — it could decide wrong, and you will not be there.
- **You cannot certify your own plan.** An author is structurally the worst judge of their own gaps: you fill them from memory while reading and experience the result as completeness. Certification takes many perspectives, each a genuinely clean instance sharing no conversation state with you.
- **There is always something left, and that is the design.** A residual gap survives every round. Findings are the method working. A review that returns nothing has told you about the review, not about the plan.

---

## The documents

| | |
|---|---|
| [`AGENTS.md`](AGENTS.md) | the always-on starting point; read in full, every session |
| [`DEVELOPER_PROFILE.md`](DEVELOPER_PROFILE.md) | who the agent is working with, and how |
| [`protocol/GAP_REVIEW.md`](protocol/GAP_REVIEW.md) | the review gate, end to end — the heart of the method |
| [`protocol/DIRECTORY_PROTOCOL.md`](protocol/DIRECTORY_PROTOCOL.md) | naming, versioning, retention |
| [`protocol/GIT_AND_DEPLOY.md`](protocol/GIT_AND_DEPLOY.md) | branching, tags, environments, key discipline |
| [`protocol/MEMORY_ROUTING.md`](protocol/MEMORY_ROUTING.md) | which tier a given fact belongs in |
| [`design/`](design/) | the interactive-design method and the Claude Design handoff |
| [`references/`](references/) | service guides — CDN, Stripe, research, copywriting |
| [`templates/`](templates/) | starting points for a project's architecture doc, README, and build guide |

---

## The gap-review gate

The part that does the most work. A plan being "exclusively executable" is a *claim*; the gate is how the claim gets tested, by cold instances trying to break it before any code exists.

Four angles, each defined by what its **access** lets it find:

- **A — cold.** The documents only, no repository. The absence is the entire point: a reviewer that cannot open a file cannot quietly fill a gap from the code, so wherever it gets stuck is exactly where the builder would have had to guess.
- **B — fidelity.** Every quoted before/after block byte-matches the real code; every new block applies cleanly.
- **C — integration.** Does it fit the wider system? C audits *the pipes* — whether a call can happen at all.
- **D — contract seam.** D audits *the payload* — what the call carries.

Each pass is a new instance. Each writes its own findings file, kept standing forever. Angles close one at a time, and a passed angle re-runs only when a change lands in its lane. The loop ends when a fresh pass of each angle finds nothing load-bearing — never when it feels close.

---

## Why it is one repository

This used to be a single large file copied into every project and synced by hand. It reached about 12,700 words after a year of appending — each hard-won lesson arriving as a new paragraph beside the old ones, with its own war story — and agents started searching it instead of reading it, which defeats the point of a must-read document.

So it was rewritten from its concepts rather than edited, split into purpose-built documents, and moved to one canonical copy. Projects hold a one-line pointer and nothing else. The always-on portion went from ~12,700 words to ~2,950.

`.agents/` is the cross-tool convention, and this uses it deliberately. Where a specific tool insists on its own file, that file is a redirect and holds nothing else.

---

## Using it yourself

Clone to `~/.agents/`, then point your tool at it:

```bash
git clone git@github.com:seanivore/agent-protocol.git ~/.agents
echo '@~/.agents/AGENTS.md' > ~/.claude/CLAUDE.md
```

`skills/` is gitignored — that directory is managed by the [skills CLI](https://github.com/vercel-labs/skills) and belongs to its own upstream repos.

Fair warning: [`DEVELOPER_PROFILE.md`](DEVELOPER_PROFILE.md) and parts of `references/` are specific to one person and one set of services. The method in [`AGENTS.md`](AGENTS.md) and [`protocol/`](protocol/) is the portable part.

---

By [Sean August Horvath](https://github.com/seanivore).
