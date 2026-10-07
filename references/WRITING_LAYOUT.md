# Writing Layout

The worked side of the writing standard in `~/.agents/AGENTS.md` section IX. AGENTS.md holds the core rules. This file holds the reasoning, the finer layout defaults, and examples you can copy.

## Who It's For

Every document has a universal reader. Sean will read it, other people may read it, and agents will read it. There is no dense mode for agents and separate layout for people. One clear structure serves all of them.

Agents don't feel the cost of a hard-to-scan page, so they rarely notice creating one. A person pays that cost every time they collaborate on the document. Sean's systems-first brain reads the shape of a page before its words, which makes the cost easy to see in his case. It is real for every reader.

Layout mostly adds lines and whitespace. The extra tokens are small next to the reading cost it saves.

## The Frame

Formatting here is information design. It's the same craft as a magazine spread, a newspaper page, or a slide deck. The eye reads the shape of the page before the words.

The single goal is lower cognitive load. Let the structure do the work the reader would otherwise do. Two mechanisms carry most of it.

**Priming through consistency**

  - Once the brain has processed one kind of information in one layout, it expects that layout again.
  - Reuse the same treatment for the same kind of information, even across sections with different names.
  - A new treatment forces a re-learn mid-document, and re-learning is load.

**Navigation**

  - Layout should let the eye jump and skip.
  - Give it markers to scan for, short category headings, and clear nesting.
  - The reader should land on what they want and pass over the rest.

Load is relative to the task. Before picking a layout, ask what the reader will do with the content. A condensed run like `*Portals to Peace · $268 · qty 1 · featured*` suits a shop page, where it's glanced at. It's wrong in a document someone reads while typing those values into a prompt. There, each field wants its own line.

When a case isn't covered, borrow from four traditions:

  - Traditional outlines: `I. → A. → 1. → a)`, each level one indent further.
  - Slide-deck discipline: one idea per line, parallel structure, no walls of text.
  - Editorial and graphic-design economy: visual hierarchy, white space, never double-signal.
  - Plain UX thinking.

These are ideas applied to cases already met, not laws. When two collide, the lower-load choice wins. The classic example: a heading is already set apart, so bolding it is redundant. The exception is a deep H4 or H5, where bold may be the last way left to tell levels apart.

## Defaults

Each default serves lower load, mostly through priming or navigation. Bend one when the load is lower another way. Then stay consistent within the document.

### Consistency

- Use the same treatment throughout. A shape used once is reused for every similar chunk.
- Give the first list group in a section the full treatment, indent and markers. It sets the pattern for everything after.
- Give each formatting device one meaning within a group. If bold marks emphasis there, it doesn't also mark list parents.
- Hold one capitalization scheme for headings, and one for list labels.
- Leave periods off list fragments. If any item in a list is a full sentence, make them all sentences with periods.

### Navigation

- Headings are short category labels to jump to. Not teasers or milestones. A milestone goes on its own line under the heading.
- A heading must be clear to a cold reader a month later. Prefer a few plain words over a cryptic shorthand.
- Use `-` for a flat list. When a list nests, mark the first level `+` and the levels below `-`. The eye scans for `+` to hop between top items.
- Put a blank line above and below every heading.

### Hierarchy

- Indentation works like a heading one level down. It shows what belongs to what. Content under a group label sits indented beneath it.
- Headings stay flush. Body text directly under a heading may stay flush or be indented two spaces. Indent it when the reader will fold sections in an editor, so each section collapses as one unit. Pick one per document.
- Indent in steps of two spaces: two for the first level, four for the second, six for the third. Never jump four in one step. Outside a list, a four-space indent turns a paragraph into a code block.
- Never make a one-item list. A single child folds into its parent.
- Text meant for pasting elsewhere stays flush left, because the indent would paste with it.

### Emphasis

- Use formatting only to emphasize, or to group information below the level of headings.
- Within a group, give each purpose one form and each form one purpose. Don't combine bold and italic on the same words.
- Code formatting for paths, commands, and identifiers is not emphasis. Use it wherever literal text appears.
- Emphasize at most once per bullet, and rarely within a paragraph. The reader will find the takeaway, or look back for it.
- Not every section needs emphasis or sub-groups. Plain text is fine. Over-signalling hides the point.
- Don't bold a heading.

### Sentences and Punctuation

- Keep sentences short, one idea each. Rewrite a run-on instead of joining its parts with em dashes, but don't chop connected thoughts into fragments.
- A colon separates a label from its details on the same line. If a line break already separates them, drop the colon.
- When a bold label shares a line with its value, the colon goes outside the bold: `**Label**:`.

## Worked Examples

Each example shows a before, an after, and notes on what changed. The examples sit in code fences so the spacing, markers, and colons are visible.

### Checkbox and Step Lists

**Before**

```markdown
## Clip 1 — "A whole store, run by chat" (GPT screen)

- [ ] **R1 · Recon.** "Show me everything that's live in the shop right now." → it calls **listProducts** and reads back the current placeholder pieces. *(Good opening beat: the GPT can see the store.)*
- [ ] **R6 · A few edits, live vs. staged.** "Set The Lantern Keeper's Cottage to $289" → **live immediately**. "Mark The Tide Library sold" → **live**. "We made 3 more of the Reading Hour" → **live** (qty 3). "Change the Cottage headline to 'Someone left the light on for you'" → **stages** a draft + preview link → "publish that." **Expect:** price/availability/quantity apply instantly; copy stages until you publish.
- [ ] **R8 · A coupon.** "Make a code for 20% off everything this weekend." → it creates it and reads the code back. Then "what sales are running?" → lists code + scope. *(Try "buy-one-get-one?" → it should decline; Stripe can't do buy-N.)*
- [ ] **R9 · Show the result.** "What's live now?" → **listProducts** shows the real, finished store. Clean transition point to the website.
```

**After**

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

**What changed**

- One idea per line does most of the work. Each quote, outcome, and aside gets its own child line, so no list line wraps.
- Markers carry the level. `+ [ ]` marks a step and `-` marks its details. The eye scans for `+` to jump between steps.
- Bold now has one job: labeling steps. The inline bold on `listProducts` and `live immediately` is gone. With each idea on its own line, that bold had become a competing signal.
- Periods follow the content. Lines that are full sentences end with one. Quotes and asides keep their own punctuation.
- Blank lines between top items help here because each step runs several lines. A list of one-line items wouldn't need them.
- The heading is rewritten for a cold reader. `Clip 1 — "…" (GPT screen)` becomes `Clip 1 of the GPT Screen Showing "…"`. That's the main wording change. One R8 line also drops a leading "Then". The rest is layout.

### Product and Content Blocks

Mostly layout. The after also renames the labels, rewords the script line, and leaves out shop-only fields this document doesn't need.

**Before**

One `###` with everything inline.

```markdown
### 1 · The Lantern Keeper's Cottage — *Portals to Peace · $268 · qty 1 · featured · images only*
**Opening:** I want to add a new piece — The Lantern Keeper's Cottage. A little stone cottage at dusk with one window that glows, $268.
**Specs:** `7" W x 6" D x 9" H` · `2.2 lbs` · stone resin, reclaimed wood, LED, natural moss, dried lavender · USB-C (adapter included) · care: dust with a soft brush, keep out of direct sun · ships 3–5 business days, insured · qty 1 · featured.
**Finished copy:**
- **headline:** A light left burning by the door
- **description:** A miniature stone cottage at dusk, its one window kept warm and gold.
```

**After**

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

**What changed**

- Layout follows the job. The original's condensed summary line suits a shop page. This document is read while copying values into a prompt, so each field gets its own grabbable line.
- Inline bold dividers become real headings. `**Opening:**`, `**Specs:**`, and `**Finished copy:**` become the `###` headings Script, Details, and Finished Copy, which fold in the editor. As headings they take no colon and no bold. The heading already does both jobs.
- The `·` run becomes one labeled line per fact. Label and value share a line, so the colon stays, outside the bold.
- `+` marks the first level here to match the checklist example in the same document. Labels hold one case throughout.
- The Script paragraph is indented in this example, but text meant for pasting stays flush left. Copy the Details layout, not that indent.

## Extending This

Lead with the purpose, never a rulebook. For a new case, ask one question: does this lower the load, by priming the reader or helping them navigate? If yes, it fits, even if it isn't listed. If a default fights the purpose in some context, the lower-load choice wins. Stay consistent with whatever you choose. Add a recurring choice as a note in the right section. Don't turn one example into a universal law.
