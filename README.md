# about-me

Julien Gaichet's one-page About Me site, designed as a kanban board: his career shown as
tickets (Shipped, Running now, Next).

Live: https://julinhio.github.io/about-me/

## Stack

- [Astro](https://astro.build) with static output, no client JavaScript
  (cards use native `<details>/<summary>`).
- [Tailwind CSS](https://tailwindcss.com) v4 through `@tailwindcss/vite`.
- System font stacks only, no web fonts, no tracking.

## Run it locally

Requires Node 22.12 or later.

```sh
npm ci            # install
npm run dev       # dev server at http://localhost:4321/about-me/
npm run build     # production build into dist/
npm run preview   # serve dist/ at http://localhost:4321/about-me/
```

## Where things live

- `src/data/board.ts` — all copy: intro, the ten cards, "How I work", "Before tech", footer.
  Copy edits happen here only.
- `src/components/Card.astro` — one card.
- `src/pages/index.astro` — the page layout.
- `src/styles/global.css` — Tailwind theme (colours, fonts, breakpoint) and card styles.
- `public/favicon.svg` — "JG" monogram.
- `scripts/drive.mjs` — headless-Chrome checks and screenshots, see
  `.claude/skills/verify-app/SKILL.md`.

## Deployment

`.github/workflows/deploy.yml` builds every pull request. On push to `main` (and on manual
`workflow_dispatch`) it builds and publishes `dist/` to GitHub Pages with the official
`actions/configure-pages`, `actions/upload-pages-artifact` and `actions/deploy-pages`.
The site is served under the `/about-me` base path at https://julinhio.github.io/about-me/.
