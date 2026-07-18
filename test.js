/**
 * Simulates multiple concurrent users going through the gender reveal app.
 *
 * Flow per user:
 *   Home (enter name) -> Selection (vote Boy/Girl) -> Confirm
 *   -> Questions (pick date -> pick mom/dad qualities -> relation)
 *   -> Suggestion -> Score page
 *
 * Setup:
 *   npm install -D playwright
 *   npx playwright install chromium
 *
 * Run:
 *   node simulate-users.js
 *
 * Config via env vars (optional):
 *   BASE_URL=http://localhost:5173 USERS=5 HEADLESS=true node simulate-users.js
 */

const {chromium} = require("playwright");

const BASE_URL = process.env.BASE_URL || "http://localhost:4173";
const USER_COUNT = 70;
const HEADLESS = true; // default true

// Small helper so animated transitions (opacity/translate, ~1000ms) have time to finish
const wait = (ms) => new Promise((res) => setTimeout(res, ms));

function randomName(i) {
  const adjectives = ["Swift", "Brave", "Calm", "Lucky", "Bright", "Bold"];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  return `${adj}User${i}_${Math.floor(Math.random() * 10000)}`;
}

function randomSuggestion() {
  const suggestions = [
    "Wishing you both endless love and laughter!",
    "Cannot wait to meet the little one.",
    "Sending so much love to your growing family.",
    "May your days ahead be full of joy.",
    "Congratulations, this is such exciting news!",
  ];
  return suggestions[Math.floor(Math.random() * suggestions.length)];
}

function randomRelation() {
  const relations = ["Aunty", "Uncle", "Grandma", "Grandpa", "Friend", "Cousin"];
  return relations[Math.floor(Math.random() * relations.length)];
}

async function simulateUser(browser, index) {
  const context = await browser.newContext();
  const page = await context.newPage();
  const log = (msg) => console.log(`[User ${index}] ${msg}`);

  try {
    log("Navigating to app...");
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });

    // ---------- HOME PAGE: enter name ----------
    const name = randomName(index);
    await page.getByPlaceholder(/enter your name/i).waitFor({ state: "visible", timeout: 30000 });
    await page.getByPlaceholder(/enter your name/i).fill(name);
    log(`Entered name: ${name}`);

    await page.getByRole("button", { name: /proceed/i }).click();
    log("Clicked Proceed");

    // ---------- SELECTION PAGE: vote Boy or Girl ----------
    await page.waitForSelector("text=/Boy's team/i", { timeout: 30000 });
    const voteBoy = Math.random() < 0.5;
    if (voteBoy) {
      await page.getByText(/Boy's team/i).click();
      log("Voted: Boy");
    } else {
      await page.getByText(/Girl's team/i).click();
      log("Voted: Girl");
    }

    // Confirm button appears after a vote is cast
    await page.getByText(/Confirm your choice/i).waitFor({ state: "visible", timeout: 10000 });
    await page.getByText(/Confirm your choice/i).click();
    log("Confirmed vote");

    // ---------- NAMING PAGE ----------
await page.getByPlaceholder(/baby's name/i).waitFor({ state: "visible", timeout: 30000 });
const babyName = `Baby${Math.floor(Math.random() * 1000)}`;
await page.getByPlaceholder(/baby's name/i).fill(babyName);
log(`Entered baby name: ${babyName}`);
await page.getByRole("button", { name: /^submit$/i }).click();
log("Submitted baby name");

    // ---------- QUESTIONS PAGE: date ----------
    await page.getByText(/When will the baby arrive/i).waitFor({ timeout: 30000 });
    await page.getByText(/Select date/i).click();
    await wait(1100); // wait for the calendar dropdown's 1000ms transition

    // Click any available (non-empty) day button in the visible calendar
    const dayButtons = page.locator("button", { hasText: /^\d+$/ });
    const count = await dayButtons.count();
    if (count === 0) throw new Error("No selectable calendar day buttons found");
    const randomIndex = Math.floor(Math.random() * count);
    const dayText = await dayButtons.nth(randomIndex).innerText();
    await dayButtons.nth(randomIndex).click();
    log(`Picked date day: ${dayText}`);

    // Submit the date step
    await page.getByRole("button", { name: /^submit$/i }).click();
    log("Submitted date");

    // ---------- QUESTIONS PAGE: qualities ----------
    await page.getByText(/Hope the baby gets/i).waitFor({ timeout: 10000 });

    // Open Mom's dropdown, pick 2 qualities
    await page.getByText(/^Moms/i).click();
    await wait(300);
    for (let i = 0; i < 2; i++) {
      const options = page.locator("li");
      const optCount = await options.count();
      if (optCount === 0) break;
      const pick = Math.floor(Math.random() * optCount);
      const label = await options.nth(pick).innerText();
      await options.nth(pick).click();
      log(`Picked mom quality: ${label}`);
      await wait(200);
    }

    // Open Dad's dropdown, pick 2 qualities
    await page.getByText(/^Dads/i).click();
    await wait(300);
    for (let i = 0; i < 2; i++) {
      const options = page.locator("li");
      const optCount = await options.count();
      if (optCount === 0) break;
      const pick = Math.floor(Math.random() * optCount);
      const label = await options.nth(pick).innerText();
      await options.nth(pick).click();
      log(`Picked dad quality: ${label}`);
      await wait(200);
    }

    await page.getByRole("button", { name: /^submit$/i }).click();
    log("Submitted qualities");

    // ---------- QUESTIONS PAGE: relation ----------
    await page.getByText(/What will the baby know you as/i).waitFor({ timeout: 10000 });
    const relation = randomRelation();
    await page.getByPlaceholder(/relation/i).fill(relation);
    log(`Entered relation: ${relation}`);
    await page.getByRole("button", { name: /^submit$/i }).click();
    log("Submitted relation");

    // ---------- SUGGESTION PAGE ----------
    await page.getByText(/Suggestion for the new parents/i).waitFor({ timeout: 10000 });
    const suggestion = randomSuggestion();
    await page.getByPlaceholder(/your suggestion here/i).fill(suggestion);
    log(`Entered suggestion: ${suggestion}`);
    await page.getByRole("button", { name: /^submit$/i }).click();
    log("Submitted suggestion");

    // ---------- SCORE PAGE (final check) ----------
    await page.waitForTimeout(1500);
    log("Flow complete ✅");
  } catch (err) {
    log(`❌ Failed: ${err.message}`);
    // Save a screenshot for debugging failed runs
    await page.screenshot({ path: `user-${index}-failure.png` }).catch(() => {});
  } finally {
    await context.close();
  }
}

async function main() {
  console.log(`Launching ${USER_COUNT} simulated users against ${BASE_URL} (headless=${HEADLESS})`);
  const browser = await chromium.launch({ headless: HEADLESS });

  const tasks = [];
  for (let i = 1; i <= USER_COUNT; i++) {
    // stagger starts slightly so it feels like real concurrent-but-not-identical traffic
    tasks.push(
      wait(i * 250).then(() => simulateUser(browser, i))
    );
  }

  await Promise.all(tasks);
  await browser.close();
  console.log("All simulated users finished.");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});