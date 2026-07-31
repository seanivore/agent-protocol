# Gap Review

The procedure for taking a build guide from *written* to *exclusively executable*, and handing it to execution.

Run it top to bottom. Every phase names its **precondition**, its **actor**, and its **exit condition** — if you are ever unsure what happens next, find the phase you are in and read its exit condition. Where a step looks like ceremony, the failure it prevents is named, because a procedure whose cost you understand survives contact with a tired context window and one you do not understand gets optimized away.

---

## The cast

- **Build Guide Orchestrator** — the long-lived *named* thread that owns the build guide across many sessions. It holds the plan, validates every finding, folds what survives, regenerates prompts, and bumps versions. It writes its own compact arguments and its own kick-off prompts, and keeps memory throughout. It is also the one actor that cannot certify its own work, which is why everything below exists.
- **Peer agents** — fresh instances the orchestrator spawns for the formal reviews. Same model, same effort setting, 1M context, and none of the orchestrator's conversation state. They are full agents running a review, not helpers running an errand — and treating them as helpers, by trimming their prompt or summarizing their output, is exactly how the independence leaks out.
- **Breadth subagents** — always **two**, re-scanning the whole guide after any significant fold. Two rather than one, because a single scanner's blind spot becomes the guide's blind spot.
- **Sean** — the human. He kicks off every formal round, and he runs angle A himself.

## The documents

- **`vX_X_X_IMPLEMENT.md`** — where the plan lives.
- **`vX_X_X_ADDENDUM_*.md`** — DESIGN, TESTING, and any sibling split out to keep the IMPLEMENT scannable. Same version, bumped in lockstep, **always inside review scope: "review the build" means the IMPLEMENT plus every addendum, always.** A version skew between them means a reviewer validates a block against a superseded spec and reports clean on something broken.
- **`vX_X_X_REVIEW_PROMPTS.md`** — copy-paste-ready blocks, one per angle. Current-only, regenerated every round, never hand-edited into a stale hybrid.
- **`vX_X_X_GAP_REVIEW_{A,B,C,D}.md`** — one file per pass, written by the reviewer. Kept standing forever, never renamed, never deleted. This is the audit trail.
- **`_RATIONALE.md`** and **`_KICKOFF_PROMPT.md`** — written at the very end. No version number in the filename.
- **`assets/docs/GOALS.md`** — what the project is FOR.
- **The living architecture document** — the system as it actually is. Read first by angle C; brought current after execution.

---

## Goals are load-bearing

Goals usually start from the first document that pitched the project or the build — high-level requirements, or just descriptive UI/UX writing about what the thing should feel like to use. More north stars surface as the plan deepens. **GOALS.md accumulates; it is never written once and closed.**

**The entire plan is built around the goals, end to end, and the goals are the lens EVERY review reads through** — the orchestrator's own self-review, both breadth passes, and every formal angle alike.

Without them a reviewer has no way to tell absence from intent, so it reads missing functionality as a deliberate design choice and reports clean. That is not hypothetical: a checkout flow with no coupon field; a text box with no spell-check. **Those are gaps, not decisions** — and only a reviewer holding the goals can tell the difference.

The same failure has a UX-shaped twin: a planner or reviewer meets a surface whose wire shapes were never pinned and declares it "unscoped" — when Sean's prose describes its whole behavior somewhere in the corpus. **Before any surface is called unscoped, data-free, or pending, harvest the corpus for his written descriptions of it** (the architecture doc's Functionality & Experience Specification first, then the archive rounds). The only valid gap-flag shape is "described behavior X lacks endpoint/envelope Y."

They pay a second dividend: with the goals at hand the orchestrator can usually answer a fork question itself instead of stopping the loop to interrupt Sean.

One line of history worth keeping — angle A began precisely to flesh out needed functionality and confirm the logic was sound. It worked, and every other angle exists because it worked.

---

## Phase 1 — Planning

**Precondition:** a concept document, high-level requirements, or an update plan exists. Anything versioned at this stage is below v1.

**Actor:** the thread that starts the work. **That thread becomes the named Build Guide Orchestrator** and stays the orchestrator for the life of the guide.

1. **Fold the concept document into `GOALS.md` first — and its descriptive UX/UI writing into the architecture doc's Functionality & Experience Specification, faithfully.** The twin capture (`AGENTS.md` § V): GOALS keeps the why; the spec section keeps the described behavior and feel per surface, in Sean's words. A new initiative inside an existing project arrives with its own concept document or requirements exactly like a new project does — that is a new north star to accumulate, not just IMPLEMENT content (`GOALS.md` never resets; see § V). Then write the IMPLEMENT beginning at **v1.0.0** from those same requirements, with the now-current goals at the forefront.
2. Run deepening sessions: research, apply findings, surface decisions, push the plan as far as it will go. **Each session that meets its goals bumps PATCH.** Skipping the bump destroys the ability to say which version a finding was written against, and a finding validated against the wrong version is worse than no finding.

**Exit condition:** the orchestrator judges the plan deep enough for formal preparation. That judgment is the only gate into Phase 2.

## Phase 2 — Pre-gate: cheap reviews first

**Precondition:** Phase 1 exited. **Actor:** the orchestrator, plus breadth subagents.

1. **Split out the addendums** so the IMPLEMENT stays digestible. A guide that has swollen past readable gets skimmed, and skimming is where gaps hide.
2. **Compact the orchestrator forward.** The fresh instance runs a **self-gap-review**, validates its own findings against live text, folds the real ones, and repeats until a pass returns nothing that survives validation.
3. **Always two breadth subagents after any significant fold.** Validate, fold, repeat until exhausted.
4. **Each completed loop bumps PATCH.**
5. **Completion prep:** every build-guide document at the SAME version → bump **MINOR** so the formal reviews open in a fresh `assets/docs/archive/vX_X/` → generate `REVIEW_PROMPTS.md`.

**Exit condition:** self-review and breadth both exhausted, versions aligned, MINOR bumped, prompts generated.

**The functionality-design pass — when the logic itself is not settled yet.** Gap review *validates* a plan; it does not *design* one. When a slice carries genuinely novel functional logic — a flexible payment schedule, a collaborative editing model, anything where "how it should work" is still open — trying to evolve that logic through gap-review folds is using a proofreading tool to write the chapter. Each reviewer sees a different corner, the folds pull in different directions, and the design never coheres.

So when the self-review or the breadth pass surfaces "this logic is not designed yet" — and they usually will — **run a dedicated functionality-design pass right here**, after the self-review has exposed what is under-specified and before the formal gate opens. A peer instance whose only job is to design how the feature works, emitting one focused design document, which then folds into the IMPLEMENT and the architecture doc. Re-run the breadth subagents on the result, and only then proceed.

It fires only for slices with real novel logic; infrastructure and mechanical slices do not need it. It is distinct from the gate (design versus validate) and distinct from the Claude Design collaboration (functional logic versus visual treatment — different axis, and they can run in parallel on the same slice). One constraint it imposes upstream: the schema a novel feature will need must be made **accommodating at its foundation slice**, even before this pass runs, so the eventual design lands without a migration.

**Hard rule: the gate is never the first reviewer.** When basics reach the gate, an expensive round and Sean's loop-time get spent rediscovering what a self-review would have caught for nearly nothing — and the round comes back so full of noise it buries the findings only the gate could have found.

---

## Phase 3a — The A loop

**Precondition:** Phase 2 exited. **Actor:** Sean runs angle A himself, in claude.ai. The orchestrator validates and folds what comes back.

**Angle A is COLD / SELF-CONTAINMENT / COMPLETENESS.** It gets the build guide, the addendums, and the architecture doc — **and NO repository access.**

**The absence of the repo is the entire point.** A reviewer that cannot open a file cannot quietly fill a gap from the code, so wherever it gets stuck is exactly where the builder would have had to guess. A spawned agent can be *told* not to look; only a tool with no repo *cannot* look — and "told not to" fails silently and invisibly. **A stays external, always.** Moving A in-house to save a manual step converts the sharpest instrument in the process into a duplicate of B.

**Every reviewer, every angle, writes `vX_X_X_GAP_REVIEW_<angle>.md` ending in exactly one verdict:**

- **READY TO BUILD**
- **NEEDS ANOTHER PASS**
- **NEEDS ANOTHER PASS (NARROW)** — "almost there, bounded area left." NARROW is load-bearing rather than a softer failure: it triggers the condense pass and lets the next pass be scoped tight instead of re-sweeping to re-find what everyone already knows.

**The loop, in order:** findings to the orchestrator → validate each against the live text → fold the real ones → two breadth subagents → fold theirs → regenerate `REVIEW_PROMPTS.md` → bump PATCH → Sean runs A again.

**Loop exit condition: A returns READY TO BUILD.** Do not advance on anything else. Advancing on a NEEDS ANOTHER PASS with "we'll catch it in B" does not work — B reads with the repo open and will fill the gap from the code exactly the way the builder would.

**Expect convergence to be non-monotonic.** A clean-looking pass can still surface something, and **a fix can create the next finding** — a fold that closes one gap has been the direct cause of the next round's bug, including a data-loss bug introduced by the previous round's own repair. That is why the exit condition is *a fresh pass that finds nothing load-bearing*, never *it feels close*. It is also why the two breadth subagents run after **every** fold and not only while first drafting: the document that just changed is exactly the document to re-scan, and it is near-free insurance against a regression the fold itself created. The breadth pass stays advisory — it is a backstop, never a substitute for the gate.

**The condense pass** runs when the next A looks like it may be the last. Rounds of surgical edits leave stray references to removed sections, notes that were true two versions ago, dated mentions, and accumulated version history. **Strip the archaeology** — it is the wrong context for an executable plan, and it is precisely the material a builder misreads as current instruction. Then two breadth subagents, then a straight **end-to-end read** to confirm the guide still flows as one document.

**On READY:** bump **MINOR** and copy the build guide into a new `vX_X/` directory — a clean workspace for B, C, and D.

## Phase 3b — B / C / D, in parallel

**Precondition:** A returned READY and the new workspace exists. **Actor:** three peer agents, each launched from its verbatim block. All three get the full repository plus every build-guide document.

- **B — fidelity.** Every quoted before/after block **byte-matches** the real code; every new block applies cleanly and references only things that exist. The same bar applies to the design addendum's decided blocks. A before-block that drifted by one character turns a mechanical apply into a debugging session the builder was never scoped for.
- **C — integration.** Reads the **living architecture document first**, then checks scoping, idempotency, auth, resource caps, conventions, conflicts, and stale pointers. **C audits the pipes** — whether a call can happen at all: routing, rewrites, auth gating, ordering, platform limits.
- **D — contract seam.** **D audits the payload** — what the call carries: shapes, fields, ownership, mock fidelity.
  - **Pre-design**, D walks every surface against every endpoint **in both directions**: each surface's data need traced to a providing endpoint, each endpoint's response traced to a consuming surface. Orphans either way are findings. **Exempt machine-called endpoints — webhooks, crons, OAuth callbacks — up front in the prompt**, or round one burns itself out on false orphans and the real ones drown in the pile.
  - **Once real UI spec exists**, D reviews design correctness instead: renders right, accessible, responsive, matches the design addendum.

**Cross-lane findings get reported anyway**, tagged with the lane that probably owns them; the orchestrator assigns lanes at fold time. A reviewer that suppresses an out-of-lane finding because it is not "its job" is the specialization failure the three-part lens exists to prevent.

**Angles close one at a time, not in lockstep.** An angle that returned READY re-runs **only** when a fold lands in ITS lane, and then it is scoped narrow: told it already passed, given the named change, asked to confirm only that, and told **explicitly that the narrowing is deliberate and is not a violation of the don't-shrink-scope mandate.** Omit that last sentence and a well-instructed reviewer obeys the standing mandate, re-reads everything, and manufactures a fresh pile of work on a document that was already clean.

**Loop exit condition:** all three return READY. Then a final breadth pass, and fold it.

## Phase 4 — Final cuts

**Precondition:** every angle READY, final breadth fold done. **Actor:** the orchestrator.

Strip everything that is the wrong context for the *execution* orchestrator: changelog, provenance, slipped-scope rationale, resolved edges, owner-decision tags, gap-review framing, excess prose. **Keep the byte-exact anchors** — those are the load.

Move substantial rationale to a sibling **`_RATIONALE.md`**, with a note in the IMPLEMENT telling the reader not to open it unless they must. Broad context helps an LLM but must not be *forced*: near ~100k tokens the guide has to still feel manageable to the agent executing it — the same reason testing and design already live in addendums.

**This cut drives a MAJOR bump.** The document stops being a plan and becomes an execution artifact. It ships with a **recommended orchestration pattern**, so the execution agent starts elevated instead of designing its own parallelism cold at the moment it should be building.

**Exit condition:** MAJOR bumped, `_RATIONALE.md` and `_KICKOFF_PROMPT.md` written, guide handed to execution.

---

## The reviewer prompts

Auto-generated. **Never hand-written per round, never assembled by Sean** — hand-assembly is where a landmine ledger goes missing or a stale charge survives a version bump.

One fully self-contained copy-paste block per angle, each carrying inline:

**1. The three-part lens — all three parts, in every angle's block.**

- **(a) The goals / north star, as the value lens.** Can a user actually do this, with the least friction? A capability that reads "covered" but is not truly drivable is a real gap.
- **(b) The broader mandate.** The north star is the primary *functionality* lens, **NOT a filter on what counts as a gap.** Search the whole build, every element. Explicitly **do not neglect the design addendum** even if you are "not the design reviewer" — the value is many eyes on the whole, not tidy specialization. Hunt anything not truly exclusively-executable, any unvalidated assumption, and any design-correctness failure: a spec that applies cleanly but renders wrong is a defect.
- **(c) Read in full, co-design, flag-don't-assert.** Read every provided document end to end; **do not ration tokens** — grep-reading has produced real mis-diagnoses. **Co-design rather than audit:** a gap is a gap whether it is a flaw in what was written or something the build should address and simply omitted. When a finding depends on runtime or code you cannot see, **FLAG it as needing verification; never assert "broken."** Whole rounds have been lost to confident broken-calls the code then disproved. The orchestrator validates every finding before folding.

**2. The landmines ledger — "Settled, do not re-raise."** Verified findings from prior rounds. Current-only and bounded: a superseding fold **REPLACES** its entry and never appends a contradiction, because a ledger holding both sides of a settled question is worse than no ledger. **Inline the full ledger inside EVERY angle's block — the duplication is deliberate.** A block gets copied out on its own, and a shared ledger at the top of the file has been missed at launch more than once; a review run without its landmines burns an entire round rediscovering settled truth. **Every fold updates every copy identically.**

**3. The angle's specific charge.**

**4. The explicit instruction to WRITE the findings file, and exactly where.**

**5. What that angle is handed.** A reviewer never opens a file it was not given, and angle A physically cannot. For A, **upload the document FILES rather than pasting bodies** — they run tens of thousands of tokens — and **name the exact files in the block**, so the reviewer knows its packet and can say when something is missing rather than quietly reviewing a partial build.

**6. No manufactured persona.** Lead with the task and the lens, not "you are a senior engineer." The model gets its role from context; the costume only displaces real instruction.

**For a DELTA build on a shipped, tested system, every block says so:** the current system is the fixed substrate, review the delta and whether it fits, do not re-litigate settled shipped behavior. Without that line, reviewers manufacture blockers out of proven production code and the round returns nothing usable.

**The loud repeated instructions — read in full, don't ration tokens, don't shrink scope, flag-don't-assert — are counter-reflex instrumentation.** They read as redundant because they are fighting a default. Never trim them for tidiness; the tidy-up reopens exactly the narrowing they were written to beat back.

### The per-block skeleton the generator fills

```
### ANGLE <X> — <CHARGE NAME>   [build vX_X_X]

WHAT YOU ARE HANDED
- <exact filenames of every doc in this packet; for A, note these are uploaded files>
- <repo access: full repo | NONE — and, for A, why none>

NORTH STAR / GOALS
<GOALS.md, inlined>
Read this as the VALUE lens: can a user actually do this, with the least friction?
A capability that reads "covered" but is not truly drivable is a real gap.

MANDATE
The north star is the primary functionality lens, NOT a filter on what counts as a gap.
Search the whole build, every element. Do NOT neglect the design addendum even if you
are not the design reviewer. Hunt: anything not exclusively-executable, any unvalidated
assumption, any design-correctness failure (applies cleanly, renders wrong).

HOW TO READ
Read every provided document end to end. Do not ration tokens. Do not grep-read.
Co-design, do not audit: a gap is a gap whether it is a flaw in what was written or
something the build should address and omitted.
If a finding depends on runtime or code you cannot see, FLAG it for verification.
Never assert "broken."

SETTLED — DO NOT RE-RAISE
<the full current landmines ledger, inlined here, identical in every block>

[DELTA BUILDS ONLY]
The shipped system is fixed substrate. Review the delta and whether it fits.
Do not re-litigate settled shipped behavior.

YOUR CHARGE
<the angle-specific charge>

OUTPUT
Write your findings to: assets/docs/archive/vX_X/vX_X_X_GAP_REVIEW_<X>.md
Rank the gaps by how likely each is to derail the build: location, what is wrong or
missing, the concrete fix. Add the single most important "if you fix one thing" insight.
End with exactly one verdict line:
READY TO BUILD | NEEDS ANOTHER PASS | NEEDS ANOTHER PASS (NARROW)
```

---

## Peer agents — five guardrails

1. **The verbatim block IS the entire prompt** — byte-for-byte, nothing prepended, appended, or trimmed. An orchestrator "tightening" a reviewer's prompt at spawn time is the conflict-of-interest leak: the author of the plan quietly shaping what its critic is allowed to see.
2. **A new instance per pass.** A reused instance defends its earlier read instead of finding the gap.
3. **Independent findings transport.** The reviewer writes its own file. **Sean reads the FILE**, never the orchestrator's summary of it; verdict lines are quoted verbatim in chat. A summarized finding is a finding filtered by the party being reviewed.
4. **Every launched pass is numbered and kept standing — none discarded.** A crashed pass is recorded as crashed. This kills verdict-shopping, and the standing trail is an audit log Sean can count.
5. **Sean kicks off each round.** The loop does not self-advance past a gate.

## Orchestrator hygiene

- **Immediately after each fold + breadth pass + prompt regeneration, compact** — with a forward-looking note written *as if the reviews just prepped are already done*, so a later resume returns a correctly-compacted orchestrator rather than one re-prepping work it already dispatched.
- **Let the orchestrator write its own compact note.** It knows what it is carrying; a note written for it drops the thing it was about to need.
- **Keep memories throughout.** The loop is far too long for one context, and a context that fills mid-round starts summarizing the plan from memory instead of reading it.
- **Each round ends by handing Sean a compact argument plus a kick-off prompt** for the next round. Err toward one round per compact whenever the round also carried folds.

---

## The Claude Design seam

Nearly every build with a front end uses **Claude Design (CD)**. The full handoff and return protocol is `~/.agents/design/CLAUDE_DESIGN_COLLAB.md`; what belongs here is where the seam lands in the build sequence.

**There are TWO seams, not one. Integration is last. Prototyping can be first.**

### The early seam — Phase A-0, before deepening

**A CD prototype is a gap-finding instrument, and it finds a class of gap that no review can.** Writing an end-to-end UX/UI description and building a prototype are **the same mechanism**: both force the *sequence* of a user's experience, and implied back-end decisions live in the sequence. **A gap review reads a plan. A prototype walks it.** A plan can pass every angle and still be missing an entire workflow, because no reviewer was ever made to move through it as the user.

**Run A-0 when**: a surface's behavior is described but its flow has never been walked · the owner cannot produce the prose (it is expensive and not summonable on demand) · or an agent is about to make flow-shaped decisions that only look like detail decisions. Full mechanics, including the `PROVISIONAL` data-shape carve-out and its four conditions, are in `CLAUDE_DESIGN_COLLAB.md` § Phase A-0.

**The trap it prevents, stated plainly because it has already cost a project a round**: an agent planned a whole client-facing negotiation workflow and surfaced one narrow fork — whether two fields were editable. The owner answered the field question correctly, with no idea a workflow had been decided. **When a fork question is about one control inside a flow nobody has walked, asking it is worse than not asking, because a confident answer to the small question reads as sign-off on the large one.** Ask for the walk instead.

**Expect the plan to move, and price it correctly.** Findings that supersede careful work are the method succeeding. A decision revised before code exists costs a paragraph; the same decision revised after the back end is built costs a rebuild. The "we already decided that" reflex is the cost of the old ordering, not evidence of waste — and the reviewer or planner feeling it is usually the one who did the superseded work.

### The late seam — integration

**The CD return packet is integrated LAST in the build guide, immediately before testing.** Some testing happens earlier through APIs and JS — that is fine. But the front end handed back from CD integrates almost last and must then be tested itself. Because prototyping with CD is so hands-on, most testing is already done by then; **this final pass is really about verifying the backend wiring.**

**Reverse gaps.** Building the UI surfaces backend needs nobody planned — the act of making the interface pushes a requirement into existence. The canonical case is a temperature *readout* next to the change-temperature dial in a climate-control UI: obvious the moment it is drawn, invisible in every prior pass. CD knows what is in the build from the carefully assembled handoff packet, so it details these precisely and may propose solutions.

**Disposition by size:**

- **Small → treat them like bugs.** Resolve on the fly.
- **Large → back up.** Adjust the remaining IMPLEMENT to accommodate, research if needed, deepen the plan, then run at least light gap reviews before proceeding. This has not been necessary yet, but it is possible — and the mistake would be patching a large reverse gap inline because the guide already said READY.

**The takeaway: the CD collaboration is the one place that needs more flexibility than the rest of the build.** Everything else is rigid by design. This seam is not, and pretending otherwise is the error.

---

## After execution

**Bring the living architecture doc current as a distinct task, run by a FRESH agent** — never as the tired tail end of the executing session. A nearly-full context summarizes from memory instead of reading, silently drops detail, and the stale lines it leaves behind poison every future cold review that trusts the doc.

The fresh agent reads the architecture doc **end to end, linearly, like a human**; walks the executed IMPLEMENT and the git history as the change source; and folds changes in with the **actual code as tiebreaker**, citing `file:line`.

Two landmines, both recurring: the doc's **Status/Version header often drifts a release behind the code** — treat it as suspect first, not ground truth. And **stale `file:line` anchors survive code growth** — re-open the file before trusting any cited line.

---

## Appendix — round-handoff templates

**Compact argument, gap-review fold.** *"The X-Type gap reviews are complete and ready to be validated and folded in, driving vN. This needs a thorough understanding of the final state of the docs and of what comes next."*

**Kick-off, gap-review fold.** *"Here are the findings from gap review number N, X-Type. Check whether they are valid to fold in, driving the build-guide docs to vN, working toward exclusively executable. Don't forget the two breadth subagent reviews after the document updates land."*

**Compact argument, peer-run round.** *"The vN packet and its REVIEW_PROMPTS are ready; next is running the B/C/D-Type gap reviews in-session as peer agents. The session needs the current docs, the five peer-agent guardrails, and what follows the round."*

**Kick-off, peer-run round.** *"Run the B/C/D-Type gap reviews in-session as peer agents from `<path to REVIEW_PROMPTS>` — each block VERBATIM as the entire prompt, in parallel, a new instance per pass, each writing its own GAP_REVIEW file. Quote each verdict line verbatim when reporting. Then validate every finding against live text (flag-don't-assert), fold the real ones, run the two breadth reviews, update memory, and hand back the compact argument plus the next kick-off prompt."*

**Kick-off, re-scoping an angle that already passed.** *"Angle X returned READY last round and a fold landed in its lane — re-run it scoped and narrowed: name the folded changes, ask it to confirm ONLY those, and state that the narrowing is deliberate and not a violation of the don't-shrink mandate. Do not re-open the full review."*

**Condense pass.** *"The build docs have had many surgical edits over time, leaving stray references and mentions of previous version changes. Condense: remove outdated notes, excess context, and version changelog history. Then two breadth subagents, fold their findings, then a straight end-to-end read to confirm nothing is missing and it all flows."*
