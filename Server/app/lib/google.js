const puppeteer = require('puppeteer');

const url = 'https://www.google.com/search?q=software+developer+entry+level+jobs&oq=jobs&aqs=chrome.0.69i59j35i39j69i60j69i61j69i60j69i65l2j69i60.3120j0j7&sourceid=chrome&ie=UTF-8&ibp=htl;jobs&sa=X&ved=2ahUKEwiho8eg8e31AhXiJ0QIHacyADQQutcGKAF6BAgdEAc&sxsrf=APq-WBsSjwLqc69srREBSjLQ9bSuOoZ5DA:1644246961616#fpstate=tldetail&htivrt=jobs&htidocid=EaIjisjqEGsAAAAAAAAAAA%3D%3D';
//Launch Chromium, Open New Page, Navigate To URL
async function getJobs() {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForTimeout(1000);

    let titles = await page.evaluate(() =>
        Array.from(
            document.querySelectorAll('.BjJfJf'),
            (element) => element.textContent
        )
    );

    let descriptions = await page.evaluate(() =>
        Array.from(
            document.querySelectorAll('.HBvzbc'),
            (element) => element.textContent
        )
    );

    //Create hrefs Array From Div With .EDblX Classname => 
    //Its First Element (div .B8oxKe) ==> Its 1st Element <span>(DaDV9e) =>
    //Finally The href Inside Of The Span
    const hrefs = await page.evaluate(() =>
        Array.from(
            document.querySelectorAll(".EDblX"),
            (element) =>
                element.firstElementChild.firstElementChild.firstElementChild.href
        )
    );
console.log(descriptions)
    //Close Browser to keep the functon from running forever
    browser.close();
};


module.exports = { getJobs };