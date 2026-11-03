# Responsive layout

- Where: `src/styles/global.css` defines the custom breakpoint `--breakpoint-board: 861px`;
  `board:` utilities in `src/pages/index.astro` switch the board to 3 columns and the
  "How I work" / "Before tech" pair to 2 columns.
- What: max width 1200px; under 861px the columns stack in order Shipped, Running now, Next,
  and the two prose blocks stack.
- Verify: `scripts/drive.mjs` at 375px (stacked tops ascending) and 1280px (equal tops),
  with no horizontal overflow closed or open; inspect the four screenshots.
