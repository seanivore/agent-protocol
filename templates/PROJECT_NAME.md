# Project Name Architecture Overview
`project.website-if-applicable.com`

**Last Updated**: YYYY-MM-DD **Version**: v1.0.0 **Status**: Status of project — note **shipped** vs **spec-only** when relevant (e.g., "v3 shipped; v4 in active build; v5 spec-only in IMPLEMENT")

---

## Executive Summary 

  + **Purpose**: this document provides everything a new AI instance needs to understand and work on this project effectively; it also serves as comprehensive technical documentation
  + **Use**: read this first before making any changes; update it after non-trivial changes ship

---

## How This Doc Relates to IMPLEMENT.md

`PROJECT_NAME.md` is the **living architecture/state doc** — what *is* true about the project right now. The current `vX_Y_Z_IMPLEMENT.md` in `docs/archive/vX_Y/` is the **living roadmap** — what's coming next, in detail.

The two play different roles:

  + **PROJECT_NAME.md** holds finalized architecture, the design system, file-structure references, common pitfalls, and the strategic roadmap *summary* (milestone-level only). Reference content lives here so IMPLEMENT and BUILD docs don't have to repeat it.
  + **`vX_Y_Z_IMPLEMENT.md`** holds the active per-milestone detail. As chunks are promoted to BUILD and ship, the corresponding section in IMPLEMENT is condensed and the architectural detail migrates into PROJECT_NAME.md.

This means PROJECT_NAME.md grows over time as the project ships, and IMPLEMENT.md stays focused on what's still ahead. If you find a fact in PROJECT_NAME.md that contradicts the current IMPLEMENT, IMPLEMENT wins (PROJECT_NAME was likely not yet updated). If a past version's IMPLEMENT contradicts PROJECT_NAME.md, PROJECT_NAME.md wins (past IMPLEMENTs are frozen). See `.agent/DEV_RULES.md` § *Master Documents* for the full conflict resolution rule.

**Notation convention**: when a section describes work that's spec-only (planned but not yet shipped), prefix it with **`[spec-only]`**. When it describes shipped behavior, no prefix needed. This keeps a future agent from acting on a planned-but-not-implemented architectural decision.

---

## Table of Contents

  1. [Project Overview](#project-overview)
  2. [Strategic Roadmap](#strategic-roadmap)
  3. [Recent Updates](#recent-updates)
  4. [Architecture Explained](#architecture-explained)
  5. [How to Run & Test Locally](#how-to-run--test-locally)
  6. [File Structure & Key Files](#file-structure--key-files)
  7. [Design System & Styling](#design-system--styling)
  8. [Common Pitfalls & Important Notes](#common-pitfalls--important-notes)
  9. [Deployment](#deployment)

---

## Architecture Overview

### Architecture Overview Diagrams

```
┌──────────────────────────────────────────────────────────────────┐
│                    Important Architecture File                   │
│              File naming convention and location                 │
│  What file does and provides to the project and this diagram     │
└──────────────────────────────────────────────────────────────────┘
                          ↕
┌──────────────────────────────────────────────────────────────────┐
│              Layer of Build Stack Architecture                   │
│                    File that controls this                       │
│  - What file and layer does                                      │
│  - What file and layer does                                      │
│  - What file and layer does                                      │
└──────────────────────────────────────────────────────────────────┘
                          ↕
┌──────────────────────────────────────────────────────────────────┐
│              Another Layer of The Application                    │
│  - File that works within this layer giving it functionality     │
│  - File that works within this layer giving it functionality     │
│  - File that works within this layer giving it functionality     │
└──────────────────────────────────────────────────────────────────┘
                          ↕
┌──────────────────────────────────────────────────────────────────┐
│           Layer of Build Architecture                            │
│  - File that works within this layer giving it functionality     │
│  - File that works within this layer giving it functionality     │
└──────────────────────────────────────────────────────────────────┘
                          ↕
┌──────────────────────────────────────────────────────────────────┐
│                    End State Of The Flow                         │
│  - Element that indicates end state of flow                      │
│  - Element that indicates end state of flow                      │
└──────────────────────────────────────────────────────────────────┘
```

---

## Project Overview

### What This Is

* **One sentence description**

  + Core functionality point 1
  + Core functionality point 2
  + Technical approach summary

### The Core Innovation

* **What makes this different from conventional approaches**

  + Key insight 1
  + Key insight 2
  + Why this matters

### Message & Purpose

* **Problem**: What problem does this solve
* **Solution**: How this project solves it

  + User goal 1: description
  + User goal 2: description

---

## Strategic Roadmap

Milestone-level orientation only. Detailed plans for each milestone live in `docs/archive/vX_Y/vX_Y_Z_IMPLEMENT.md` (the highest-numbered version is the active living roadmap). This section exists so any agent can see the milestone shape without reading the full archive.

### Public Release Line

[If the project has a "first public release" pin — e.g., "Does not ship publicly until vX.0.0 because feature Y is the prerequisite" — state it here. Otherwise remove this subsection.]

### Milestones

| Version   | Theme                          | Ship to            | Status                              |
| --------- | ------------------------------ | ------------------ | ----------------------------------- |
| **vX.x**  | What this milestone is about   | Internal / Public  | In flight / Planned / Spec-only     |
| **vY.0**  | What this milestone is about   | Public / Soft launch | Research / Planned                |
| **vNext** | Strategy phase, not promised   | TBD                | Strategy phase                      |

### vX.x — [milestone name]

[One-paragraph framing. Then bullets for each minor or patch under this milestone, with a short sentence and a pointer to the IMPLEMENT/BUILD detail.]

- **vX.0.0** (current/shipped/spec-only) — what this version does. Spec: `docs/archive/vX_Y/vX_Y_Z_IMPLEMENT.md` § [section].
- **vX.1.0** — what this version does. Spec: [path].

### Roadmap rules of thumb

- **One IMPLEMENT.md per version** — this section names versions; details live there.
- **Research before promotion** — anything in vNext stays in `docs/research/` until a `final_recommendations.md` closes the bucket.
- **Don't read this section during execution** — the active BUILD or IMPLEMENT is the source of truth for what to build *now*. This section is for orientation.

---

## Recent Changes

### YYYY-MM Updates 

* **Feature/Fix Category**

  + Specific change 1
  + Specific change 2
  + Specific change 3

* **Technical Improvements**

  + Change with rationale
  + Performance optimization details
  + Schema/API version notes (e.g., "Schema v3.2")

---

## Architecture Explained

### High-Level Overview

* **Describe the overall architecture pattern**

  ```
  [Diagram or flow representation]
  Component A → Component B → Component C
  ```

### Key Architectural Decisions

  1. **Decision 1** — Rationale for why this approach was chosen
  2. **Decision 2** — Trade-offs considered
  3. **Decision 3** — Future implications

### How It Actually Works

* **Flow or process explanation**

  ```javascript
  // Example code showing the core pattern
  const example = async () => {
      // Step 1: ...
      // Step 2: ...
      // Step 3: ...
  };
  ```

---

## How to Run & Test Locally

### Prerequisites

  + Dependency 1 — install with `command`
  + Dependency 2 — version requirements
  + Environment setup notes

### Local Development Server

  ```bash
  # Start local server
  [command to run]
  ```

### Testing Different Scenarios

* **Scenario 1**

  ```
  [How to test this scenario]
  ```

* **Scenario 2**

  ```
  [How to test this scenario]
  ```

### Testing Workflow

  1. Start the dev server
  2. Test scenario 1 — expected behavior
  3. Test scenario 2 — expected behavior
  4. Verify specific functionality

---

## File Structure & Key Files

  ```text 
  ~/Development/project-name/
  ├── file.html           # Description
  ├── file.js             # Description
  ├── config.json         # Description

  ├── src/
  │   ├── component.js    # Description
  │   └── module.js       # Description

  ├── assets/
  │   ├── js/             # Description of contents
  │   ├── media/          # Description of contents
  │   └── docs/           # Description of contents
  ```

### Key Module Files

**`module-name.js`** — What it does, key functions
  + Details about what the file does
  + Key function of the file
  + Important note about the file

**`module-name.js`** — What it does, key functions
  + Details about what the file does
  + Key function of the file
  + Important note about the file

### Key Setup Files

**`config.json`** — What it configures, schema version
  + Details about what the file does
  + Key function of the file
  + Important note about the file

### Key Important File Group

**`another-file-any-type.ts`** — What it does, key functions
  + Details about what the file does
  + Key function of the file
  + Important note about the file

**`another-file-any-type.ts`** — What it does, key functions
  + Details about what the file does
  + Key function of the file
  + Important note about the file

---

## Data Flow Illustrated Visually

### End-to-End Flow

```
ENTRY POINT
  ↓
(01) WHAT ENTRY POINT CONTAINS
  ↓
(02) HOW ENTRY POINT TRIGGERS THE FLOW
  ↓
(03) FIRST STEP IN THE FLOW 
  ↓
(04) SECOND STEP IN THE FLOW 
  ↓
(05) THIRD STEP IN THE FLOW 
  ↓
(06) FOURTH STEP IN THE FLOW 
  ↓  ↓
SECONDARY DATA OR USER ENTRY POINT
  ↓
(08) WHAT ENTRY POINT CONTAINS 
  ↓
(09) HOW ENTRY POINT TRIGGERS THE FLOW
  ↓
(10) FIRST STEP IN THE FLOW
  ↓
(11) SECOND STEP IN THE FLOW
  ↓
(12) RESULT OF SOMETHING FROM THE FLOW 
  ↓
RESULT OF FLOW AND ENDPOINT OF DATA TRANSFORMATION 
```

### Data Or User States

1. **Important state of data or user**: Implications of the state
2. **Result of this state activated**: Change provides what results and benefit
3. **Next Step In Flow**: Explanation of the step in the flow

---

## Design System & Styling

### Color Scheme

  ```css
  :root {
      --color-primary: #[hex];
      --color-secondary: #[hex];
      --color-bg: #[hex];
      --color-text: #[hex];
  }
  ```

### Design Principles

  1. Principle 1
    - How it manifests in the design

  2. Principle 2
    - Implementation approach

### Typography Scale

  ```css
  /* Headings */
  h1 { font-size: [size]; }
  h2 { font-size: [size]; }

  /* Body */
  body { font-size: [size]; }
  ```

### Responsive Breakpoints

  ```css
  /* Mobile-first */
  @media (min-width: 768px) { /* Tablet */ }
  @media (min-width: 1024px) { /* Desktop */ }
  ```

---

## Common Pitfalls & Important Notes

### Things That Look Like Bugs But Aren't

  1. Behavior
    - Why it's intentional

  2. Behavior
    - Why it's intentional

### Common Mistakes to Avoid

* **Don't**

  + Thing not to do
  + Why

* **Do**

  + Correct approach
  + Benefit

### Important Conventions

  + **Convention 1** — Why it matters for consistency
  + **Convention 2** — How to maintain it

### Performance Considerations

  + Critical performance note
  + Optimization that must be maintained

---

## Development Philosophy

### "Exclusively Executable Plan" Approach

**Core Principle**: Understand everything upfront, resolve unknowns before coding, create complete plan before execution.

**Why This Works**:
- AI can generate 20 files in minutes (old process would take days)
- But AI can also generate 20 WRONG files in minutes
- Planning prevents wrong files
- Planning is faster than debugging wrong code

**Process**:
1. Understand the full system
2. Plan every detail upfront
3. Identify unknowns and resolve them
4. Write complete, correct code
5. Test once, it works

**Benefits**:
- Front-load the thinking, back-load the execution
- Avoid debugging nightmare
- Write fresh code with confidence
- No "unknown unknowns" hiding in old code

### Planning vs Debugging

**Old Development Process** (Debugging-Heavy):
  1. Write code
  2. Test it
  3. Find bugs
  4. Fix bugs one by one
  5. Repeat until it works
  6. **Problem**: Each bug blocks testing, takes hours/days

**Modern AI-Assisted Process** (Planning-Heavy):
  1. Understand the full system
  2. Plan every detail upfront
  3. Identify unknowns and resolve them
  4. Write complete, correct code
  5. Test once, it works
  6. **Benefit**: Front-load the thinking, back-load the execution

### Rewriting vs Patching

**Previous Agent's Work**:
  - ❌ Didn't understand Vercel until the end
  - ❌ Converted to React without full understanding
  - ❌ Made assumptions that were wrong
  - ❌ Left broken code expecting us to fix it

**Our Approach**:
  - ✅ Full understanding before coding
  - ✅ Complete plan before execution
  - ✅ Write fresh code with confidence
  - ✅ Test after everything works

**Why This is Better**:
  - If we need full understanding to fix bugs, we need it to write code anyway
  - Writing fresh code is faster than debugging broken code
  - We'll have confidence it's correct
  - No "unknown unknowns" hiding in old code

---

## Deployment

### Build Process

  ```bash
  # Commands to build for production
  [build commands]
  ```

### Hosting Configuration

  + **Platform**: GitHub Pages / Vercel / etc.
  + **Build source**: Branch or directory
  + **Custom domain**: `domain-if-applicable.com`

### CI/CD Notes

  + Workflow or action notes
  + Environment variables needed

### Post-Deploy Verification

  1. Check specific functionality
  2. Verify critical path
  3. Test edge case

---

## Quick Reference / Appendix / Useful Information

### CLI Commands

| Command         | Description              |
|-----------------|--------------------------|
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `[custom]`      | Description              |

### Environment Variables

| Variable   | Purpose            | Required |
|------------|--------------------|----------|
| `VAR_NAME` | What it configures | Yes/No   |
| `VAR_NAME` | What it configures | Yes/No   |

### Schema/App/Api/Etc. Versions

| Version | Date         | Changes            |
|---------|--------------|--------------------|
| v3.2    | `YYYY-MM-DD` | Summary of changes |
| v3.1    | `YYYY-MM-DD` | Summary of changes |

---

## Common Tasks & Debugging

### Using Common Tool

Use common tool for regular task. It works in this way, by doing this other thing, and then this final thing. Novel resilience that is beneficial to be know about hte common use tool.

### Debugging App Function

**Symptoms**: App bug issues explain in short

**Check**:
  1. **Suggestion**: What to do with the suggestion
  2. **Suggestion**: How the suggestion could help eliminate the issue

**Common Issues**:
  - **Reoccurring Bug**: How to identify and fix the reoccurring bug
  - **Reoccurring Bug**: How to identify and fix the reoccurring bug

### Debugging App Function

**Symptoms**: App bug issues explain in short

**Check**:
  1. **Suggestion**: What to do with the suggestion
  2. **Suggestion**: How the suggestion could help eliminate the issue

**Common Issues**:
  - **Reoccurring Bug**: How to identify and fix the reoccurring bug
  - **Reoccurring Bug**: How to identify and fix the reoccurring bug

---

## Key Principles - **REMEMBER THIS**

  1. **Novel App functionality**: How not to break the app functionality
  2. **Other App functionality**: How the app functionality can be monitored
  3. **Another App Functionality**:
    - A type of this app functionality: What this type of the functionality is
    - A type of this app functionality: What this type of the functionality is

---

## Related Documentation

- **Name of Documentation**: `location/of/document/`
- **Name of Documentation**: `location/of/document/`
- **Name of Documentation**: `location/of/document/`

---
*Note about updates, purpose, need-to-knows, etc.*