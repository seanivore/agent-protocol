# Research Protocol

**Version**: 1.0.0
**Last Updated**: 2026-04-27
**Purpose**: Standardize how research-heavy projects flow from open questions → defensible plans → polished deliverables (business plans, strategy docs, technical implementation guides).
**Syncing**: Sync any updates via `filemgmt` (see § *Syncing This Document*).

---

## When to Use This Protocol

Use this protocol when a project has any of:

- **Strategic uncertainty** that must be resolved before architecture decisions are made (target market, monetization model, technical architecture, build-vs-buy choices).
- **A business plan or pitch deliverable** to produce.
- **Multiple research tracks** that need coordinated synthesis (market analysis, competitive landscape, technical feasibility).
- **Forward-looking work** where the answer to "what should we build" depends on research that hasn't happened yet.

Don't use it for:

- Tactical implementation planning — that's `.agent/DEV_RULES.md` § *Exclusively Executable Implementation Plans*.
- A single research question with one obvious deliverable — just write the doc.
- Bug investigations or scoped feature research — those live in `vX_Y_Z_DEV_PLANNING.md`.

---

## Core Design Principle

**Research moves through three phases — each with a different bar for evidence and a different output shape.** The directory structure makes the phase visible at a glance, and gate documents enforce that synthesis happens at phase boundaries rather than research drifting forever in `1_DEEP/`.

```
docs/
└── research/
    ├── 1_DEEP/        ← exploratory, divergent, source-collection
    ├── 2_FOCUS/       ← convergent, gap-filling, draft consolidation
    ├── 3_FINAL/       ← polished deliverables for outside audiences
    └── QUALITATIVE/   ← human-validation work like focus groups
```

---

## Phase 1 — `1_DEEP/`: Exploratory Research

**Purpose:** Cast a wide net. Surface every relevant question, source, competitor, model, and constraint. Tolerate contradictions; note them.

### Structure

`1_DEEP/` is organized by **research bucket**, not by question. Each bucket is a domain area for the project:

```
1_DEEP/
├── 1_REVIEW.md                     ← gaps caught reviewing initial findings
├── 1_REFINE.md                     ← refinement decisions and follow-up plans
├── PRODUCT_OPPORTUNITY.md          ← (or similar) the foundational thesis doc
├── final_recommendations.md        ← Phase 1 synthesis (closes the phase)
├── <bucket-name>/
│   ├── <topic>.md
│   └── <topic>.md
└── <bucket-name>/
    └── <topic>.md
```

Bucket names are project-specific. Examples from real projects:

- `market-analysis/`, `competitive-landscape/`, `target-demographics/`, `funding/`, `business-viability/`
- `technical-feasibility/`, `auth-and-accounts/`, `sync-architecture/`
- `ai-features/`, `monetization/`, `native-apps/`

### Document patterns inside `1_DEEP/`

- **Topic docs** (`PLATFORM_OVERVIEW.md`, `competitive_analysis.md`, etc.) — one question or domain area per file. Cite sources inline. Note open questions explicitly.
- **External source notes** (`article-<slug>.md`) — captured snippets from articles, papers, threads. Treat as raw material; don't conflate with synthesized findings.
- **Iteration docs** (`1_REVIEW.md`, `1_REFINE.md`) — meta documents that capture what's been done and what's missing. Updated as the phase progresses; never deleted.
- **Synthesis** (`final_recommendations.md`) — closes Phase 1. Lists what's answered, what's still open, what changed in the project's understanding.

### When to leave Phase 1

Phase 1 ends when `final_recommendations.md` can be written and the open questions in it are sharp enough that Phase 2 can target them directly. Don't wait for "everything answered" — that doesn't happen in `1_DEEP/`. Wait for "the right questions are now framed."

---

## Phase 2 — `2_FOCUS/`: Convergent Refinement

**Purpose:** Answer the targeted questions surfaced by Phase 1's synthesis. Begin draft consolidation. Decide what's in scope for the final deliverable and what's deferred.

### Structure

```
2_FOCUS/
├── RESEARCH_FINALIZATION.md            ← phase process doc (THIS IS THE GATE)
├── DOC_REVIEWS_PREP.md                 ← review feedback capture
├── REVIEW_NOTES.md                     ← iteration feedback
├── <targeted-answer-doc>.md            ← one per gap from Phase 1
├── <targeted-answer-doc>.md
├── <DELIVERABLE>_draft-v1.md           ← first consolidation attempt
├── <DELIVERABLE>_draft-v2.md           ← (only if v1 changed substantially)
└── FINAL_REVIEW_BEFORE_<NEXT>.md       ← exit gate to Phase 3
```

### Gate documents

These are not optional. They're what make the protocol resilient.

- **`RESEARCH_FINALIZATION.md`** — the process map for Phase 2. Lists every gap from Phase 1's `final_recommendations.md` and tracks which are now answered, which are flagged as open (with rationale), and which were dropped. This document is updated continuously through Phase 2.
- **`FINAL_REVIEW_BEFORE_<NEXT>.md`** — the exit gate. Confirms Phase 2 is ready to consolidate into Phase 3 deliverables. Sections: what Phase 1 addressed, what Phase 2 unearthed, what remains open (with rationale for closing or carrying), what the next phase is. The `<NEXT>` token names the downstream activity (e.g., `FINAL_REVIEW_BEFORE_SWARM.md`, `FINAL_REVIEW_BEFORE_BUSINESS_PLAN.md`, `FINAL_REVIEW_BEFORE_IMPLEMENT.md`).

### Draft → final naming

Drafts use `_draft-vN` suffix. Once consolidated and ready for Phase 3, the file moves to `3_FINAL/` *without* the suffix.

```
2_FOCUS/BUSINESS_PLAN_draft-v1.md  →  3_FINAL/BUSINESS_PLAN.md
```

The Phase 2 draft stays in `2_FOCUS/` as historical record. Don't delete it.

### Iterative review loop

Apply the gap-finding loop pattern (parallels `.agent/DEV_RULES.md` § *The Gap-Finding Loop*):

1. After each `1_DEEP/` bucket consolidates, run a fresh-context subagent — one with no prior conversation context — to find gaps and contradictions vs. publicly available info. Capture findings in a `1_REVIEW.md` or bucket-specific review doc.
2. At the `2_FOCUS` boundary, run a planning subagent to draft a candidate deliverable from consolidated research; have a second fresh subagent red-team it.
3. Iterate until gaps are closed or explicitly flagged as open in the appendix. Then promote the draft to `3_FINAL/`.

**Why fresh subagents:** A reviewer who has already seen draft v1 unconsciously fills in gaps from memory rather than catching them. The cold-read reaction is the reviewer's whole value.

---

## Phase 3 — `3_FINAL/`: Polished Deliverables

**Purpose:** Audience-ready output. Nothing here is mutable in the way `1_DEEP/` and `2_FOCUS/` are. Updates to a `3_FINAL/` document mean a versioned re-issue (`-v2`), not an in-place edit.

### Structure

```
3_FINAL/
├── BUSINESS_PLAN.md                    ← formal, numbered, comprehensive
├── EXECUTIVE_SUMMARY.md                ← shareable 2-3 page version
├── EXECUTIVE_SUMMARY_<audience>.md     ← audience variants (investors, creators, partners)
├── GENERATED_REPORTING.md              ← synthesized briefings, press releases
└── <other-deliverables>/
    └── ...
```

### Standard `BUSINESS_PLAN.md` structure (11 sections)

Use as a template; not all projects need every section.

```markdown
# [Product Name] Business Plan

**Created**: YYYY-MM-DD
**Version**: v1.0
**Status**: [Pre-Development / In-Market / Pivot Pending]

---

## 1. Executive Summary
- Company description
- Founding team
- The thesis in one paragraph

## 2. Market Opportunity
- Sizing, growth, timing

## 3. Industry Intelligence
- Trends, regulatory, technology shifts

## 4. Competitive Landscape
- Direct, adjacent, substitute. What's the wedge.

## 5. Product Strategy
- What we build, in what order, why

## 6. Technical Architecture
- Stack, key decisions, ops plan

## 7. Go-to-Market
- Acquisition channels, pricing, launch plan

## 8. Financial Model
- 3-year projection, unit economics, key assumptions

## 9. Risk Analysis
- Internal, market, technical, regulatory

## 10. Funding Strategy
- Path, milestones, exit options

## 11. Appendix: Open Research Items
- Questions deferred from `2_FOCUS`, with rationale for why they don't block this plan
```

### Audience variants

When the same content needs different framings for different readers (investors vs. customers vs. partners), produce a separate `EXECUTIVE_SUMMARY_<audience>.md` rather than trying to make one document do everything. Variants share the same underlying claims; they differ in emphasis, length, and call-to-action.

---

## Cross-cutting Conventions

### Document frontmatter

Every document in `1_DEEP/`, `2_FOCUS/`, and `3_FINAL/` opens with:

```markdown
# Title

**Created**: YYYY-MM-DD
**Version**: v1.0  (or draft-vN in 2_FOCUS)
**Status**: Research Phase / Pre-Development / Complete

---
```

This is short and consistent enough that a fresh agent can scan a directory and see what's done and what's draft.

### Open items go in an appendix — never hide them

Every consolidating document (Phase 1's `final_recommendations.md`, Phase 2's drafts, Phase 3's final deliverables) ends with an explicit `Open Research Items` section. This is the single most-violated rule in informal research workflows: people quietly drop questions they couldn't answer. **Don't.** A flagged open item with rationale is far more valuable than a silently dropped one — it tells the next reader (or the next session) where to start.

### Cross-references between phases

When a Phase 2 doc cites a Phase 1 finding, link to it explicitly:

```markdown
Per `1_DEEP/competitive-landscape/competitive_analysis.md` § "Pricing observed in adjacent markets," ...
```

This keeps the chain of evidence walkable. A reader of `BUSINESS_PLAN.md` should be able to trace any claim back to the Phase 1 source in two clicks.

### Parallel research streams

`QUALITATIVE/` (or similar) lives alongside the main 3-phase tree when there's a parallel track that doesn't fit the pipeline — focus groups, user interviews, ethnographic notes. It doesn't go through `1_DEEP/` → `3_FINAL/`; it feeds into the synthesis at Phase 2 and Phase 3 as a separate evidence stream.

---

## Tooling Integrations

### Subagents for parallel research

Phase 1 buckets are typically independent enough that they can be researched in parallel. Spawn one subagent per bucket with a tight prompt:

> Research <bucket-name> for project <X>. Specific questions: [list]. Return: a markdown summary with sources cited, open questions flagged, and a short recommendation. Save findings to `docs/research/1_DEEP/<bucket-name>/<topic>.md`.

Use Explore-style or general-purpose subagents — the work is bounded enough that they don't need full project context.

### Gap-finding via fresh subagents

At the Phase 1 → Phase 2 boundary and again at the Phase 2 → Phase 3 boundary, run a fresh-context subagent to red-team the consolidation. Its prompt: "find every gap, ambiguity, contradiction, or unverified claim." Cold reviewers catch the unknown unknowns; previously-engaged reviewers don't.

### NotebookLM / external synthesis tools

For large source corpora, external tools (NotebookLM, similar) can pre-synthesize before the agent does the final consolidation. Output goes into `1_DEEP/` as `article-<slug>.md` notes; the agent treats them as raw material, not as final findings.

---

## Anti-Patterns

1. **Skipping the gate documents.** "We know what we're doing, we don't need `RESEARCH_FINALIZATION.md`." → research drifts in `1_DEEP/` indefinitely; no one knows when Phase 1 is done.
2. **Editing `3_FINAL/` documents in place.** A `3_FINAL/` deliverable is frozen at issue. Updates mean a `-v2` re-issue with the prior version preserved.
3. **Hiding open questions.** A Phase 3 deliverable that pretends every question is answered is less useful than one that flags the unknowns. Investors, partners, and your future self all benefit from honesty here.
4. **Bucket creep.** Adding a 12th research bucket halfway through Phase 1 because "we just realized we need to know X." If X genuinely matters, it's a Phase 2 gap, not a Phase 1 bucket.
5. **Phase mixing in one document.** A doc in `1_DEEP/` that tries to also be a Phase 3 deliverable. Keep phases pure; consolidation happens at phase boundaries via gate documents.

---

## Syncing This Document

This protocol is intended to be the same across projects that use it. To propagate updates from one canonical copy out to every other project:

```bash
filemgmt -f ~/Development -r /path/to/canonical/.agent/RESEARCH_PROTOCOL.md
```

Project-specific research bucket choices, deliverable shapes, and stakeholder lists are *not* synced — each project keeps those in its own `docs/research/` tree. Only the protocol itself syncs.
