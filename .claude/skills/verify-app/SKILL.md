---
name: verify-app
description: Launch, check and drive Julien Gaichet's About Me site (Astro static build served under /about-me/). Use to prove a change works in the real built page — cards open/close by click and keyboard, with and without JavaScript, at 375px and 1280px — and to collect screenshots and a Lighthouse summary.
---

# verify-app — About Me site

A single static page built by Astro into `dist/`, served under the base path `/about-me/`
(production: https://julinhio.github.io/about-me/). No client JavaScript; cards are native
`<details>/<summary>`. All copy lives in `src/data/board.ts`.

Run every command from the repository root. Evidence goes to `.fredrin/tmp/` (git-ignored).

## Launch

1. Clean install and build from a fresh `dist/`:
   ```sh
   rm -rf dist && npm ci && npm run build
   ```
2. Serve the production build. Port 4321 is the default; if it is taken Astro picks the
   next free port and prints it, so read the port from the log:
   ```sh
   npm run preview -- --port 4321 > .fredrin/tmp/preview.log 2>&1 &
   echo $! > .fredrin/tmp/preview.pid
   grep -o 'http://localhost:[0-9]*/about-me' .fredrin/tmp/preview.log
   ```
3. **Ready** = HTTP 200 on `/about-me/` with the h1 present:
   ```sh
   curl -s -o /dev/null -w "%{http_code}\n" http://localhost:<port>/about-me/   # 200
   curl -s http://localhost:<port>/about-me/ | grep -c '>Julien Gaichet'         # >= 1
   ```
   A 303 to `/connexion` or any other page means another local app owns that port —
   use the port Astro printed, never stop the other app.

## Doctor (read-only)

- `node -v` — Astro 7 needs Node >= 22.12.
- `npm run build` exits 0 and `dist/index.html` contains no `<script` tag:
  `! grep -q '<script' dist/index.html`.
- Links resolve: the Drive script's last block checks every `href`/`src` (mailto, LinkedIn,
  GitHub, favicon, canonical/OG URL) and that local URLs live under `/about-me/`.

## Drive

Tooling lives outside the project so the site keeps no dev dependencies:

```sh
npm i --prefix .fredrin/tmp/tools playwright-core lighthouse   # once
node scripts/drive.mjs http://localhost:<port>/about-me/ .fredrin/tmp/evidence
```

`scripts/drive.mjs` uses the local Chrome (`channel: "chrome"`) and, at 375px and 1280px,
with JavaScript on and off:

- selectors: cards `details.card` (10), summary `details.card > summary`, toggle box
  `.toggle`, columns `main section[aria-labelledby^="col-"]` (`col-shipped`, `col-running`,
  `col-next`);
- all cards start closed; clicking JG-1's summary opens then closes it; focusing card 2's
  summary, Enter opens and Space closes it;
- the toggle box stays a square (only the glyph rotates);
- no horizontal overflow, closed or open; columns stack under 860px, side by side above;
- screenshots `375-closed.png`, `375-open.png`, `1280-closed.png`, `1280-open.png`.

It prints PASS/FAIL per check and exits 1 on any failure.

Lighthouse (mobile, default form factor):

```sh
CHROME_PATH="<path to chrome>" node .fredrin/tmp/tools/node_modules/lighthouse/cli/index.js \
  http://localhost:<port>/about-me/ --form-factor=mobile --chrome-flags="--headless=new" \
  --output=json --output-path=.fredrin/tmp/evidence/lighthouse.json --quiet
```

Target: Performance >= 90 and Accessibility >= 90 (all four were 100 when this skill was proven).

## Evidence

Keep under `.fredrin/tmp/evidence/`: the four screenshots, `lighthouse.json` and a
`lighthouse-summary.txt` with the four category scores, plus the drive script output.

## Cleanup

Stop only the preview server this skill started, then keep the evidence:

```sh
kill "$(cat .fredrin/tmp/preview.pid)"   # on Windows, if the npm wrapper outlives it:
# taskkill //F //T //PID <pid listening on <port>>   (find it with: netstat -ano | grep :<port>)
```

Never kill processes on ports this skill did not start.

## Feature map

- [Intro and contact links](features/intro-and-contact.md)
- [The board and cards](features/board-and-cards.md)
- [Responsive layout](features/responsive-layout.md)
- [Deploy](features/deploy.md)
