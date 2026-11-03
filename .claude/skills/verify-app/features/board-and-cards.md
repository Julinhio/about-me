# The board and cards

- Where: `src/pages/index.astro` (board section), `src/components/Card.astro`,
  styles in `src/styles/global.css` (`.card`, `.card-next`, `.toggle`, `.live-dot`),
  copy in `src/data/board.ts` (`columns`).
- What: three columns Shipped (5), Running now (2), Next (3); header row "The board" /
  "10 tickets" (count computed from the data). Each card is a `<details class="card">`
  whose `<summary>` is the face: meta (ID, "Runs nightly" dot, or "Hypothesis" badge),
  square toggle, serif title, face line, tag chips. Detail sits below a dashed divider:
  a `<dl>` (Problem / What I built / Result) for Shipped, a paragraph otherwise.
  JG-5 has no Result on purpose.
- Behaviour: all cards start closed; click or Enter/Space toggles; works with JS disabled;
  only the "+" glyph rotates 45deg; the live dot stops pulsing under
  `prefers-reduced-motion: reduce`.
- Verify: `scripts/drive.mjs` (open/close by click and keyboard, JS on and off, square toggle).
