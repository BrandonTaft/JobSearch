const puppeteer = require('puppeteer');
const fs = require('fs/promises');
const url = "https://www.brandontaft.net"
async function checkPortfolio() {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    //take screenshot of url, gives it a name, tells it to shoot the whole page
    await page.screenshot({path: "give-it-a-filename.png", fullPage: true})

    //close browser or itll sit there and keep running
    await browser.close()
}
module.exports.checkPortfolio = checkPortfolio