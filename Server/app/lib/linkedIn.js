const puppeteer = require('puppeteer');

const url = 'https://www.linkedin.com/jobs/entry-level-web-developer-jobs-united-states/?geoId=103644278';
//Launch Chromium, Open New Page, Navigate To URL
async function getLinkedInJobs() {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForTimeout(1000);
    
    const titles = await page.evaluate(() =>
    Array.from(
        document.querySelectorAll("ul > li > div > div > div > div"),
        (element) => element.textContent
    )
);
    

    // let descriptions = await page.evaluate(() =>
    //     Array.from(
    //         document.querySelectorAll('.HBvzbc'),
    //         (element) => element.textContent
    //     )
    // );

    // //Create hrefs Array From Div With .EDblX Classname => 
    // //Its First Element (div .B8oxKe) ==> Its 1st Element <span>(DaDV9e) =>
    // //Finally The href Inside Of The Span
    // const hrefs = await page.evaluate(() =>
    //     Array.from(
    //         document.querySelectorAll(".EDblX"),
    //         (element) =>
    //             element.firstElementChild.firstElementChild.firstElementChild.href
    //     )
    // );
console.log(titles)
    //Close Browser to keep the functon from running forever
    browser.close();
};


module.exports = { getLinkedInJobs };