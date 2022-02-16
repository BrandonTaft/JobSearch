const puppeteer = require('puppeteer');
const cron = require('node-cron');
const url = "https://www.brandontaft.net";

function start() {
    cron.schedule("* * 7 * *",
        async function checkPortfolio() {

            const date = new Date().getDay()
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url, { "waitUntil": "networkidle0" });
            await page.screenshot({ path: `screenshots/status-pic${date}.png`, fullPage: true })
            await browser.close()
            console.log("Screenshot Taken")

        }
    );
};

module.exports = { start }