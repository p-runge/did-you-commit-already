import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer";
import puppeteerCore, { type Page } from "puppeteer-core";
import { env } from "~/env";

async function getElementBySelector(page: Page, selector: string) {
  try {
    await page.waitForSelector(selector);
    return await page.$(selector);
  } catch (error) {
    console.error("Error fetching the element:", error);
  }
}

async function getData(username: string) {
  const profileUrl = `https://github.com/${username}`;

  let browser;

  if (process.env.NODE_ENV === "development") {
    console.log("Development browser: ");
    browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: true,
    });
  } else {
    console.log("Development production: ");
    browser = await puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
  }
  const page = await browser.newPage();

  let imageUrl = "";
  let hasContributedToday = false;
  try {
    // Navigate to the URL
    await page.goto(profileUrl, { waitUntil: "networkidle2" });

    // Wait for the element to appear (if needed)
    await Promise.all([
      page.waitForSelector(".js-calendar-graph-table"),
      page.waitForSelector(".avatar"),
    ]);

    // todayLevel
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const todayLevel = (await page.evaluate((timezone) => {
      const today = new Date(
        new Date().getTime() + (timezone - 1) * 60 * 60 * 1000,
      )
        .toISOString()
        .split("T")[0]!;

      // Query the DOM for the relevant elements
      const table = document.querySelector(".js-calendar-graph-table");
      if (!table) return null;

      const todayCell = table.querySelector(`td[data-date="${today}"]`);
      if (!todayCell) return null;

      return todayCell.getAttribute("data-level");
    }, env.TIMEZONE)) as string;
    hasContributedToday = parseInt(todayLevel?.toString() ?? "") > 0;

    // imageUrl
    const avatar = await getElementBySelector(page as Page, ".avatar");
    if (avatar) {
      imageUrl =
        (await avatar.evaluate((img) => {
          return img?.getAttribute("src");
        })) ?? "";
    }
  } catch (error) {
    console.error("Error fetching the dynamic element:", error);
  } finally {
    // Close the browser
    await browser.close();
  }

  return {
    imageUrl,
    hasContributedToday,
  };
}

const github = {
  getData,
};
export default github;
