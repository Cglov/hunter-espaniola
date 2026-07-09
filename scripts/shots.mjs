import { chromium } from "playwright";
import { mkdirSync } from "fs";

const OUT = "/private/tmp/claude-501/-Users-cooperglover/e8637a7a-ff37-4f5b-9905-8ea145f9aa90/scratchpad/shots";
mkdirSync(OUT, { recursive: true });
const BASE = "http://localhost:3000";

const autoScroll = async (page) => {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const timer = setInterval(() => {
        window.scrollBy(0, 400);
        total += 400;
        if (total >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 60);
    });
  });
  await page.waitForTimeout(900);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
};

const browser = await chromium.launch();

const routes = [
  ["home", "/"],
  ["work", "/work"],
  ["case-study", "/work/canyon-rim-estate"],
  ["about", "/about"],
  ["services", "/services"],
  ["book", "/book"],
];

for (const [device, viewport] of [
  ["desktop", { width: 1440, height: 900 }],
  ["mobile", { width: 390, height: 844 }],
]) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  for (const [name, path] of routes) {
    try {
      await page.goto(BASE + path, { waitUntil: "load", timeout: 30000 });
      await page.waitForTimeout(1500);
      await page.screenshot({ path: `${OUT}/${device}-${name}-fold.png` });
      await autoScroll(page);
      await page.screenshot({ path: `${OUT}/${device}-${name}-full.png`, fullPage: true });
      console.log(`ok ${device} ${name}`);
    } catch (e) {
      console.log(`FAIL ${device} ${name}: ${e.message.split("\n")[0]}`);
    }
  }
  await ctx.close();
}

// Fly the drone on desktop: click through all 5 legs, capture states.
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(BASE + "/", { waitUntil: "load" });
await page.waitForTimeout(1800);
await page.screenshot({ path: `${OUT}/fly-0-start.png` });
for (let leg = 1; leg <= 5; leg++) {
  await page.mouse.click(720, 450);
  await page.waitForTimeout(900);
  if (leg === 1) await page.screenshot({ path: `${OUT}/fly-${leg}-midflight.png` });
  await page.waitForTimeout(8500); // clip finishes (ramped ~5-6s) + settle
  await page.screenshot({ path: `${OUT}/fly-${leg}-arrived.png` });
  console.log(`leg ${leg} done`);
}
await ctx.close();
await browser.close();
console.log("ALL DONE");
