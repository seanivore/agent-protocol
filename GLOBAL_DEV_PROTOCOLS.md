# Global Development Protocols & Process Engine
<!-- Protocol Version: v4.1.0 -->

## INTENT & CORE MANDATE
These prompt lines serve as **counter-reflex instrumentation**. They are explicitly engineered to override an LLM's natural token-saving flaws and lazy defaults (the instinct to do less, narrow its own lane, grep/skim, assert blindly from pre-training data, or budget tokens context-safely). Keep these rules intact across all active processing blocks. Never trim them.

---

## SECTION 1: THE GAP-REVIEW GATE
The orchestrator manages review iterations using a highly regimented, sequential pass matrix. The gate is **never** allowed to act as the first reviewer.

### 1. The Three-Part Review Lens
When performing a review pass, your evaluation lens must strictly implement three distinct operations:
*   **(a) Read-in-Full:** Execute a linear, end-to-end evaluation of the targeted artifacts. Aggressive skimming or searching via regex/grep is strictly forbidden.
*   **(b) Co-Design-Not-Audit:** Function as an active system co-designer optimizing architecture, not a passive box-checker auditing syntax.
*   **(c) Flag-Don't-Assert:** If an apparent issue depends on runtime behavior, compiled code, or peripheral blocks that you cannot explicitly see in your context window, it must be **FLAGGED** as *needs-verification*. Never assert that code is "broken" from pre-training speculation. (Historical Lesson: Entire rounds of false alarms were caused by confident "broken" calls that the code disproved. On a structural delta, always prefer: *"I cannot verify X"* over *"X is broken"*).

### 2. The Verdict Trichotomy
Every review phase must terminate in exactly one of three diagnostic evaluations:
1.  `READY TO BUILD`
2.  `NEEDS ANOTHER PASS`
3.  `NEEDS ANOTHER PASS (NARROW)` — Load-bearing designation used for high-efficiency planning iterations.

### 3. Angle Segregation & Matrix Closing (THE CORE)
Review angles close sequentially, angle-by-angle. A passed angle re-runs only when an active fold lands directly in its operational lane, triggering a highly narrowed scope check ("You passed; confirm only X; the narrow scope is deliberate, not a violation"). This stops the anti-polish treadmill.

*   **Angle A (Context Only):** Receives project documentation only. **Strictly NO access to the repository codebase.** Executes final cold-A holistic passes.
*   **Angles B/C/D (Hybrid View):** Receives repo access, core documentation, and the shared ledger.
    *   *Angle C Charge:* Must explicitly read the living core architecture document first.
    *   *Angle D Charge (Design/UX):* Must read design research and user feedback first. Conditional on heavy UX/Design initiatives. If UI/UX changes are light, fold D into B/C, but explicitly instruct the model: *"The design addendum remains in scope, do not skip it."*
*   **Cross-Lane Backstop:** Two distinct sub-agents execute a parallel breadth pass to provide an absolute backstop before any folder state is finalized.

### 4. The "Settled — Do Not Re-Raise" Ledger
*   **Substrate Rule:** When a build is a delta on a shipped or tested system, every prompt must explicitly state that the current system (architecture doc + repo) is the **proven substrate** and the build is a delta on top. Review the delta and its execution fit; do not re-litigate, re-design, or flag settled behavior.
*   **Ledger Constraints:** Maintain a current-only, bounded ledger of verified prior-round findings. This context is shared once across reviewing units (Angles B/C/D at 1M tokens). A superseding fold replaces its ledger entry; never append contradictory context.

### 5. Auto-Generation Protocol
The orchestrator auto-generates a self-contained, paste-ready file named `vX_Y_Z_REVIEW_PROMPTS.md`. Each block inlines:
1.  The two-part review lens (The North Star value lens AND the broader mandate to search the *whole* build—the IMPLEMENT + every addendum—for exclusively-executable, unvalidated assumptions, or design gaps. The lens must never shrink the scope).
2.  The full, living landmines list (Append new findings dynamically every round).
3.  The specific angle charge.
4.  The explicit instruction to write findings directly to `vX_Y_Z_GAP_REVIEW_<angle>.md`.

---

## SECTION 2: FILE ARCHETYPES & OPERATIONAL ARTIFACTS
Information is routed across five distinct memory tiers based on operational scope. Nothing is deleted; historical states are systematically archived.

*   **IMPLEMENT vs BUILD:** Both files name a ready-to-execute guide. A complete "plan-it-all" sequence runs its gate-cleared `IMPLEMENT` file directly at the execution target version. A `BUILD` packet represents clean, isolated, ready-to-execute slices carved out of an incomplete or larger architectural plan. The execution arrangement (single session vs split tracks, sequential vs parallel execution) is a dynamic planning-time decision, never a default automated layout.
*   **BUILD Packets Layout:** Initiative-mode tracks use single-letter labels: `vX_Y_Z_TRACK_<LETTER>_BUILD.md` (e.g., `v5_0_3_TRACK_A_BUILD.md`). Letter tracking keeps scope honest; descriptive names pigeonhole logic when track scope expands beyond the original label. Patch-mode or single-track uses: `vX_Y_Z_BUILD.md`. If an execution instance receives a BUILD packet, it must **NOT** read past historical IMPLEMENTs, BUGS, or FEEDBACK files — their changes are already folded.
*   **Addendums:** Large structural implementations may split complex design or validation testing matrices into same-version sibling files (e.g., `..._ADDENDUM_DESIGN.md`). Sibling documents bump version numbers in lockstep and are always inside the gap-review perimeter. Production-grade placeholders mean real content is never a build/test blocker.
*   **Chronological Logs (SESH / FEEDBACK):** Date-named files (`YYYY_MM_DD_SESH.md`, `YYYY_MM_DD_FEEDBACK.md`). Event-in-time records that directly drive IMPLEMENT revisions or application version shipments. Headers must point exactly at the version they affect.
*   **Bug Execution Tracking:** Researched, complex bug logs spawn a completely new `IMPLEMENT` track. Small, on-the-fly execution adjustments belong exclusively inside the final `BUILD_REPORT`.
*   **Formatting Layouts:** Project defaults remain highly dense for efficient agent parsing. Only on an explicit human request for "human-formatted" files (or a clearly human-only doc) should layout design transition to the cognitive-load-minimized structure defined in `.agents/HUMAN_FORMATTING.md`.

---

## SECTION 3: SYSTEM HYGIENE & VERSIONING MECHANICS

### 1. Retention Policy (Exit-a-Dir-Keep-a-Copy)
Living planning frameworks (`IMPLEMENT`, addendums, and review charters) are strictly **current-only** through the gap-review loop. A version modification renames the files to maintain sequential track patches via git, while terminal execution records (`GAP_REVIEW`, `BUGS`, `FEEDBACK`, `SESH`) are kept standing chronologically.

### 2. As-Built Documentation Sync
*   **Fresh-Instance Guard:** The living architecture documentation must be brought to current-state using a completely FRESH agent instance.
*   **Derivation Vectors:** The fresh agent must derive state exclusively from the build-adjusted `IMPLEMENT` file (read end-to-end and linearly first) combined with the final `BUILD_REPORT`. 
*   **Tie-Breaker:** Code implementation acts as the absolute tie-breaker on all behavioral or architectural structural conflicts. Never let a tired session's memory summarize updates.
*   **Upstream Annotation:** Every active step inside an `IMPLEMENT` matrix must carry a one-line `Doc impact:` marker inline (e.g., `Doc impact: none`) to prevent separate addendums from drifting out of sync.
*   **Landmine Warning:** The Status/Version header frequently drifts a release behind. Always verify it against the newest `BUILD_REPORT` first. Stale `file:line` anchors survive code growth; always re-verify location bounds before trusting old anchors.

### 3. Orchestrator Hygiene & Final Cuts
*   **Compacting:** Perform a compact-forward sequence immediately following every structural file fold to keep memories sharp across extended multi-turn loops.
*   **Build Guide Final Cuts:** After every single review angle registers as `READY`, execute full-read cleanups. Strip all changelogs, structural provenance indicators, architectural rationales, human owner-decision tags, and gap-review framings. Migrate expansive structural rationales to a sibling `RATIONALE.md` file and execute a **MAJOR** version bump.

