import { chromium } from "playwright";
const OUT = "/private/tmp/claude-501/-Users-cooperglover/e8637a7a-ff37-4f5b-9905-8ea145f9aa90/scratchpad/shots";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "load" });
await page.waitForTimeout(2000);
await page.screenshot({ path: `${OUT}/fly-0-start.png` });
for (let leg = 1; leg <= 5; leg++) {
  await page.mouse.click(720, 450);
  // wait until the waypoint chip (or landing payoff) is visible => flight settled
  await page.waitForTimeout(1200);
  await page
    .waitForSelector("text=/fly on|goes back|deserves this view/", { timeout: 20000 })
    .catch(() => {});
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/fly-${leg}-arrived.png` });
  console.log(`leg ${leg} settled`);
}
await page.waitForTimeout(2500); // drone return-to-home animation
await page.screenshot({ path: `${OUT}/fly-5-arrived.png` });
await browser.close();
console.log("DONE");
