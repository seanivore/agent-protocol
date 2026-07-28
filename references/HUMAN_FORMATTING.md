# Human-Formatted Documents

> Opt-in layout for documents Sean reads himself. **This is NOT the default.** Read the gate below before applying any of it — most docs must stay in the dense default.

Sean has an ASD/ADHD visual-systems brain. When a doc is *for him*, a deliberate layout lets him scan, nest, and IDE-fold it fast. When a doc is for *agents* (plans, specs, gap-reviews), that same layout is a liability — it roughly **triples the line count** (the worked example below went 179 → 466 lines, ~2.6×) and dense one-logical-line markdown is how models ingest best. So this is a switch, not a style. *(This file is agent-facing, so it's written in the dense default; only the fenced "after" blocks below are human-formatted.)*

## The frame — read this before any specific guideline

Formatting here is **information design** — the same craft as laying out a magazine spread, a newspaper page, or a slide deck, where the eye reads the *shape* of the page before it reads the words. The single north star is **lessening cognitive load**: make the structure do the work the reader would otherwise spend effort on. It is not a rulebook; anything is fair game if it lowers the load. Two mechanisms carry almost all of it:

- **Priming through consistency.** Once the brain has processed a kind of information in a given layout, it expects the same layout next time. Reuse the exact same treatment for similar information throughout a document — even across differently-named sections, wherever a chunk takes the same shape. Deviating forces a re-learn mid-document — and re-learning *is* added load.
- **Navigation.** Layout should let the eye jump and skip — a marker it scans for (the next `+`), short category headings, clear nesting — so the reader lands on what they want and ignores the rest.

And load is **relative to the task** — so before picking a layout, consider what the reader will *do* with the content. The same facts want different shapes for different jobs. A condensed inline run like `*Portals to Peace · $268 · qty 1 · featured*` is ideal *under a product on a shop*, where it's glanced at — but wrong in a doc someone reads while typing those values into a GPT prompt, where each field should be its own grabbable line. Match the layout to the job, not to abstract prettiness.

The lineage to borrow from when a case isn't covered: **traditional outlines** (`I. → A. → 1. → a) → 1) → i.`, each level one indent further), **slide-deck discipline** (one idea per line, parallel structure, no walls of text), **editorial / graphic-design economy** (visual hierarchy, white space, never double-signal), and plain **UX thinking**. So treat everything below as *these ideas applied to cases we've hit* — not laws. When two guidelines collide, the lower-cognitive-load choice wins. The canonical example: a heading is already set apart by being a heading, so **bolding it is redundant** — except at a deep H4/H5 where you've run out of other ways to tell levels apart, and bold there earns its place.

## When to apply this — and when NOT

**Apply when:**
- Sean explicitly says **"human-formatted"** (or "human format" / "make this human-formatted"). This keyword is the reliable trigger.
- A doc is *unambiguously* for Sean's eyes only and never read by an agent. If there's any doubt, stay dense and ask — don't assume.

**Do NOT apply (the default) for:**
- Anything a fresh agent instance will read: `IMPLEMENT`/`BUILD` docs, `ADDENDUM`s, gap-review charters/findings, `DEV_RULES`, `AGENTS.md`, `EXECUTION_PROMPT`s, session/build reports, schema/config files.
- General prose, commit messages, PR bodies, code comments.
- "Write this for me" / "do this for me" — that's not the trigger. Only the **human-formatted** keyword (or a clearly Sean-only doc) flips the switch.

Sean's other always-on rules (soft-wrap prose, table width, no timing language) still hold; this *adds* layout on top of them when triggered.

## The two goals in practice

Strong defaults, each in service of a goal. Bend them when the goals are better served another way — but bend deliberately, and then stay consistent within the document.

### Consistency (priming)
- **Same treatment throughout.** A shape used once is reused for every similar chunk later, including in differently-named sections. The reader should never meet a second flavor of the same thing.
- **The first list group in a section gets the full treatment** (indent + markers). It sets the prime for everything after; never skip it to save effort.
- **One device, one meaning per section.** If **bold** already marks emphasis in a section, don't *also* use bold to mark list parents — the eye is trained to read it as the first meaning. Pick another cue.
- **One capitalization scheme, held.** Headings are either Title Case (usual) or sentence case (first word only) — pick one for the document. The same applies to list-item labels.
- **Periods almost never on list items.** If any item is a full sentence that wants a period, make them all sentences and give them all periods. Mixed is worse than none.

### Navigation
- **Headings are short category labels** for jumping to — not clickbait or milestones. Not "Then We Had An Idea." The heading is the category; a milestone or idea goes as a **bold first line** under it, set off by blank lines.
- **A heading must be unambiguous to cold-you.** Short, but never cryptic — favor a few plain words over a shorthand that reads as "wait, what was this?" a month later. When clarity and brevity conflict, clarity wins: `Clip 1 of the GPT Screen Showing "…"` beats `Clip 1 — "…" (GPT screen)`.
- **Distinct marker per level: `+` at the first level, `-` for sub-lists.** The eye scans for `+` to hop between top-level items and skips the detail in between. `+` always means "top of a list group," consistently.
- **Blank line above and below every heading.**

### Hierarchy (from the traditional outline)
- **Headings stay flush; their body is indented.** Markdown's `#` levels carry the hierarchy; the indent marks "this is the body of the heading above," so a heading folds together with everything under it (Sean collapses sections in the IDE to control what he sees).
- **2-space indent unit, never 4.** Each deeper nesting level adds 2 more (4, 6, …), aligned under the parent's text — each level one step further in, outline-style.
- **Never a one-item list.** No `A.` without a `B.`, however deep. A single child means it isn't a list — fold it into the parent.

### Emphasis & punctuation (don't double-signal)
- **Bold/italics sparingly** — just the bit that earns it. One emphasis type per emphasized thing (not bold *and* italic); avoid two emphasis types in a single line.
- **Don't bold a heading** — it's already emphasized by being a heading. (Exception: deep H4/H5 needing another differentiation cue.)
- **A colon separates a label from its details on the same line.** If a line break already does that separation — a heading, or a label on its own line — the colon is redundant; drop it. When label and value share a line, keep the colon, and put it **outside** the bold: `**Label**:`.

## Worked sections

Each shows the **dense original**, then a **human-formatted** version, then notes tying the changes back to the goals. The human versions are tidied to the principles above — the live `v2_0_0_GPT_BEHAVIOR_TEST_SCRIPT.md` was formatted under time pressure and deviates in spots (flat lists left as `-`, mixed label caps, a duplicated heading); trust these principles, not that file. Examples sit in code fences so the literal spacing, markers, and colons are visible.

### Checkbox / step lists

**Dense original:**
```markdown
## Clip 1 — "A whole store, run by chat" (GPT screen)

- [ ] **R1 · Recon.** "Show me everything that's live in the shop right now." → it calls **listProducts** and reads back the current placeholder pieces. *(Good opening beat: the GPT can see the store.)*
- [ ] **R6 · A few edits, live vs. staged.** "Set The Lantern Keeper's Cottage to $289" → **live immediately**. "Mark The Tide Library sold" → **live**. "We made 3 more of the Reading Hour" → **live** (qty 3). "Change the Cottage headline to 'Someone left the light on for you'" → **stages** a draft + preview link → "publish that." **Expect:** price/availability/quantity apply instantly; copy stages until you publish.
- [ ] **R8 · A coupon.** "Make a code for 20% off everything this weekend." → it creates it and reads the code back. Then "what sales are running?" → lists code + scope. *(Try "buy-one-get-one?" → it should decline; Stripe can't do buy-N.)*
- [ ] **R9 · Show the result.** "What's live now?" → **listProducts** shows the real, finished store. Clean transition point to the website.
```

**Human-formatted:**
```markdown
## Clip 1 of the GPT Screen Showing "A whole store, run by chat"

  + [ ] **R1 · Recon.**
    - "Show me everything that's live in the shop right now."
    - → it calls listProducts and reads back the current placeholder pieces.
    - *(Good opening beat: the GPT can see the store.)*

  + [ ] **R6 · A few edits, live vs. staged.**
    - "Set The Lantern Keeper's Cottage to $289" → live immediately.
    - "Mark The Tide Library sold" → live.
    - "We made 3 more of the Reading Hour" → live (qty 3).
    - "Change the Cottage headline to 'Someone left the light on for you'" → stages a draft + preview link → "publish that."
    - Expect: price/availability/quantity apply instantly; copy stages until you publish.

  + [ ] **R8 · A coupon.**
    - "Make a code for 20% off everything this weekend." → it creates it and reads the code back.
    - "What sales are running?" → lists code + scope.
    - *(Try "buy-one-get-one?" → it should decline; Stripe can't do buy-N.)*

  + [ ] **R9 · Show the result.**
    - "What's live now?" → listProducts shows the real, finished store.
    - Clean transition point to the website.
```

**What changed, and why:**
- **One idea per line** is the move that does the work. Each quote, each `→ outcome`, each `*(aside)*` gets its own `-` child so no list line wraps — every line is a single scannable thing (serves both goals).
- **Markers carry the level:** `+ [ ]` for the step, `-` for its details. The eye scans for `+` to jump between steps and skips the detail. This is the only place bold is asked to do the parent-label job, and nothing else competes for bold here — *one device, one meaning.*
- **The inline emphasis bold is dropped** (`listProducts`, `live immediately` are now plain). With each idea already isolated on its own short line, the bold was a second, competing signal; removing it keeps bold meaning exactly one thing in this section.
- **No periods** on the fragment lines; R6/R9 lines that are full sentences take them — consistently within their item.
- **Blank line between the top items** here is a navigation choice *because each step is multi-line* — it chunks them. For a list of single-line items you would not add it. Judge by the content, not by reflex.
- **The heading is rewritten for cold clarity** — `Clip 1 — "…" (GPT screen)` → `Clip 1 of the GPT Screen Showing "…"`. The terse parenthetical reads fine in the moment but makes future-you pause; spelling it out removes the question. (This is the one wording change in the example; everything else is pure layout.)

### Product / content blocks

*Layout only — this ignores the content Sean added in his real pass (media links, reordering) and shows how the same fields get re-laid-out.*

**Dense original** — one `###` with everything inline:
```markdown
### 1 · The Lantern Keeper's Cottage — *Portals to Peace · $268 · qty 1 · featured · images only*
**Opening:** I want to add a new piece — The Lantern Keeper's Cottage. A little stone cottage at dusk with one window that glows, $268.
**Specs:** `7" W x 6" D x 9" H` · `2.2 lbs` · stone resin, reclaimed wood, LED, natural moss, dried lavender · USB-C (adapter included) · care: dust with a soft brush, keep out of direct sun · ships 3–5 business days, insured · qty 1 · featured.
**Finished copy:**
- **headline:** A light left burning by the door
- **description:** A miniature stone cottage at dusk, its one window kept warm and gold.
```

**Human-formatted:**
```markdown
## 1. The Lantern Keeper's Cottage

### Script

  I want to add a new piece called "The Lantern Keeper's Cottage". It is "a little stone cottage at dusk with one window that glows" for $268.

### Details

  + **Dimensions**: 7" W x 6" D x 9" H
  + **Weight**: 2.2 lbs
  + **Materials**: stone resin, reclaimed wood, LED, natural moss, dried lavender
  + **Power**: USB-C (adapter included)
  + **Care**: dust with a soft brush, keep out of direct sun
  + **Ships**: 3–5 business days, insured
  + **Quantity**: 1

### Finished Copy

  + **Headline**: A light left burning by the door
  + **Description**: A miniature stone cottage at dusk, its one window kept warm and gold.
```

**What changed, and why:**
- **Layout follows the job.** The original's summary line `*Portals to Peace · $268 · qty 1 · featured · images only*` is graphic-design-tidy and right *under a product on a shop*, where it's glanced at. But this doc is read while copy-pasting values into a GPT prompt — reference-while-producing — so that condensed run is unpacked into fields you can grab one at a time. Same facts, different shape, because the use-case differs.
- **Inline bold dividers become real headings.** `**Opening:**`, `**Specs:**`, `**Finished copy:**` turn into `###` headings — each field now folds and shows in the outline, so Sean can collapse the fields he isn't working on. Once it's a heading it takes **no colon and no bold**: the heading already separates the label from its details and already sets it apart, so a colon or bold would be double-signalling.
- **The `·`-run becomes one labeled line per fact** — same one-idea-per-line. These keep the label *with* the value on one line, so the colon stays (its real job) and sits **outside** the bold.
- **`+` at the first level** (consistent with the checklist section's top level); labels in **one consistent case** (Title Case throughout, rather than the original's `headline` / `Specs` mix).

## Extending this

Lead with the purpose, never a rulebook. Everything above is *lessening cognitive load* applied to cases we've already hit. For a new case, ask: *does this lower the load — does it prime the brain and aid navigation?* If yes, it fits, even if it isn't listed. If a listed default fights the purpose in some context, the lower-load choice wins (and you stay consistent with whatever you chose, document-wide). Add a recurring situational choice as a note in the relevant section; don't mint a universal law out of one example.
