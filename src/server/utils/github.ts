import { Octokit } from "octokit";
import puppeteer from "puppeteer";

const octokit = new Octokit();

const getUser = async (username: string) => {
  const { data } = await octokit.rest.users.getByUsername({
    username,
  });

  return data;
};

async function getHasContributedToday(username: string) {
  const profileUrl = `https://github.com/${username}`;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let todayLevel = null;
  try {
    // Navigate to the URL
    await page.goto(profileUrl, { waitUntil: "networkidle2" });

    // Wait for the element to appear (if needed)
    await page.waitForSelector(".js-calendar-graph-table");

    // Get the content of the element
    todayLevel = await page.evaluate(() => {
      const germanTimezone = 2;
      const today = new Date(
        new Date().getTime() + germanTimezone * 60 * 60 * 1000,
      )
        .toISOString()
        .split("T")[0]!;

      // Query the DOM for the relevant elements
      const table = document.querySelector(".js-calendar-graph-table");
      if (!table) return null;

      const todayCell = table.querySelector(`td[data-date="${today}"]`);
      if (!todayCell) return null;

      return todayCell.getAttribute("data-level");
    });
  } catch (error) {
    console.error("Error fetching the dynamic element:", error);
  } finally {
    // Close the browser
    await browser.close();
  }

  return todayLevel !== "0";
}

const github = {
  getUser,
  getHasContributedToday,
};
export default github;
