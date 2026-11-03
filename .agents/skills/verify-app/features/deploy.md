# Deploy

- Where: `.github/workflows/deploy.yml`, `astro.config.mjs` (`site: "https://julinhio.github.io"`,
  `base: "/about-me"`).
- What: on pull requests the workflow runs `npm ci` + `npm run build` only. On push to `main`
  and on `workflow_dispatch` it also uploads `dist/` with `actions/upload-pages-artifact` and
  publishes with `actions/deploy-pages` to https://julinhio.github.io/about-me/.
  Pages on `Julinhio/about-me` uses source "GitHub Actions".
- Verify: the PR's "Build and deploy / build" check is green; after merge,
  `curl -s -o /dev/null -w "%{http_code}" https://julinhio.github.io/about-me/` returns 200
  and the favicon at `/about-me/favicon.svg` returns 200.
