const puppeteer = require('puppeteer');
const schedule = require('node-schedule');
const url = "https://www.brandontaft.net";

function startPortfolio() { schedule.scheduleJob('0 13 * * *', async function checkPortfolio() {

                const date = new Date().getDay()
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto(url, { "waitUntil": "networkidle0" });
                await page.screenshot({ path: `screenshots/status-pic${date}.png`, fullPage: true })
                await browser.close()
                console.log("New Screenshot Taken At 1 PM")
    
            });
};

module.exports = { startPortfolio }