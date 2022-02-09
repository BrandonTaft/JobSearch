const puppeteer = require('puppeteer');
const url = 'https://www.linkedin.com/jobs/entry-level-web-developer-jobs-united-states/?f_E=2&f_JT=F&f_PP=106224388&geoId=103644278';

async function getLinkedInJobs() {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForTimeout(1000);
    const info = await page.evaluate(() =>
        Array.from(
            document.querySelectorAll('.base-search-card__info'),
            (element) => element.textContent.replace(/(\r\n|\n|\r)/gm, "")
        )
    );
    const hrefs = await page.evaluate(() =>
        Array.from(
            document.querySelectorAll(".base-card__full-link"),
            (element) =>
                element.href
        )
    );
    
    browser.close();
}

// let titles = await page.evaluate(() =>
//         Array.from(
//             document.querySelectorAll('.base-search-card__title'),
//             (element) => element.textContent
//         )
//     );

//     let company = await page.evaluate(() =>
//         Array.from(
//             document.querySelectorAll('.base-search-card__subtitle'),
//             (element) => element.textContent
//         )
//     );



module.exports = { getLinkedInJobs };