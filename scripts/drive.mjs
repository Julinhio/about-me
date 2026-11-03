// Drives the built site in headless Chrome and saves evidence.
// Usage: node scripts/drive.mjs [baseUrl] [outDir]
// Needs a local Chrome and playwright-core, installed outside the project so the
// site keeps zero dev dependencies:
//   npm i --prefix .fredrin/tmp/tools playwright-core
// Exits non-zero on any failed check.
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const tools = resolve(process.env.TOOLS_DIR ?? ".fredrin/tmp/tools");
const { chromium } = createRequire(`${tools}/`)("playwright-core");

const url = process.argv[2] ?? "http://localhost:4321/about-me/";
const out = process.argv[3] ?? ".fredrin/tmp/evidence";
mkdirSync(out, { recursive: true });

const failures = [];
const check = (ok, msg) => {
  console.log(`${ok ? "PASS" : "FAIL"} ${msg}`);
  if (!ok) failures.push(msg);
};

const browser = await chromium.launch({ channel: "chrome" });

for (const js of [true, false]) {
  for (const width of [375, 1280]) {
    const tag = `${width}${js ? "" : "-nojs"}`;
    const page = await browser.newPage({ viewport: { width, height: 900 }, javaScriptEnabled: js });
    const res = await page.goto(url);
    check(res?.status() === 200, `[${tag}] HTTP 200`);
    check((await page.locator("h1").textContent())?.trim() === "Julien Gaichet", `[${tag}] h1 present`);

    const cards = page.locator("details.card");
    check((await cards.count()) === 10, `[${tag}] 10 cards`);
    const openAtStart = await page.locator("details.card[open]").count();
    check(openAtStart === 0, `[${tag}] all cards start closed`);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    check(overflow <= 0, `[${tag}] no horizontal overflow (${overflow}px)`);

    if (js) await page.screenshot({ path: `${out}/${width}-closed.png`, fullPage: true });

    // Click open / click close.
    const first = cards.first();
    await first.locator("summary").click();
    check(await first.evaluate((d) => d.open), `[${tag}] click opens JG-1`);
    const box = await first.locator(".toggle").boundingBox();
    check(box !== null && Math.abs(box.width - box.height) < 1 && box.width <= 23, `[${tag}] toggle box stays square`);
    const overflowOpen = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    check(overflowOpen <= 0, `[${tag}] no overflow with card open`);
    if (js) await page.screenshot({ path: `${out}/${width}-open.png`, fullPage: true });
    await first.locator("summary").click();
    check(!(await first.evaluate((d) => d.open)), `[${tag}] click closes JG-1`);

    // Keyboard: focus the second card's summary, Enter opens, Space closes.
    const second = cards.nth(1).locator("summary");
    await second.focus();
    await page.keyboard.press("Enter");
    check(await cards.nth(1).evaluate((d) => d.open), `[${tag}] Enter opens card 2`);
    await page.keyboard.press("Space");
    check(!(await cards.nth(1).evaluate((d) => d.open)), `[${tag}] Space closes card 2`);

    // Columns stack under 860px, sit side by side above.
    const tops = await page.locator("main section[aria-labelledby^='col-']").evaluateAll((els) =>
      els.map((e) => Math.round(e.getBoundingClientRect().top)),
    );
    const stacked = tops[0] < tops[1] && tops[1] < tops[2];
    check(width < 860 ? stacked : new Set(tops).size === 1, `[${tag}] column layout (${tops.join(",")})`);

    await page.close();
  }
}

// Link and asset check: every href/src must be absolute external, mailto, or under /about-me/.
const page = await browser.newPage();
await page.goto(url);
const refs = await page.evaluate(() =>
  [...document.querySelectorAll("[href],[src]")].map((e) => e.getAttribute("href") ?? e.getAttribute("src")),
);
for (const ref of refs) {
  if (ref.startsWith("mailto:")) {
    check(ref === "mailto:julien@syntaxbuddy.io", `mailto ${ref}`);
  } else if (ref.startsWith("https://julinhio.github.io/")) {
    check(ref.startsWith("https://julinhio.github.io/about-me/"), `canonical/og ${ref}`);
  } else if (ref.startsWith("http")) {
    let status = 0;
    try {
      status = (await fetch(ref, { method: "GET", redirect: "follow" })).status;
    } catch {}
    // LinkedIn answers bots with 999; treat any response as reachable, record the code.
    check(status > 0, `external ${ref} -> ${status}`);
  } else {
    check(ref.startsWith("/about-me/"), `local under base: ${ref}`);
    const r = await page.request.get(new URL(ref, url).href);
    check(r.status() === 200, `local ${ref} -> ${r.status()}`);
  }
}

await browser.close();
console.log(failures.length ? `\n${failures.length} FAILED` : "\nALL PASSED");
process.exit(failures.length ? 1 : 0);
