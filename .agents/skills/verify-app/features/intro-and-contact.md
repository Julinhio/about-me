# Intro and contact links

- Where: `src/pages/index.astro` (`<header>`), copy in `src/data/board.ts` (`intro`, `footer`).
- What: one h1 "Julien Gaichet", the line, the sub-line, three pill links at least 44px tall
  (Email me filled accent; LinkedIn and GitHub outlined). Footer repeats the email as a mailto.
- Links: `mailto:julien@syntaxbuddy.io`, `https://linkedin.com/in/jgaichet`,
  `https://github.com/Julinhio`.
- Verify: `scripts/drive.mjs` link block (mailto exact match, external URLs answer).
  LinkedIn may answer automated clients with 999; the script records the code and only fails
  when there is no response at all.
