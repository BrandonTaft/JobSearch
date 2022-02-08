const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const url = 'https://www.linkedin.com/jobs/entry-level-web-developer-jobs-united-states/?f_E=2&f_JT=F&f_PP=106224388&geoId=103644278';

async function getMyLinkedInJobs() {
//     const browser = await puppeteer.launch({
//         headless: false
//     });
//     const page = await browser.newPage();
//     await page.goto(url);
//     await page.waitForTimeout(1000);

//     let titles = await page.evaluate(() =>
//         Array.from(
//             document.querySelectorAll('.BjJfJf'),
//             (element) => element.textContent
//         )
//     );

//     let descriptions = await page.evaluate(() =>
//         Array.from(
//             document.querySelectorAll('.HBvzbc'),
//             (element) => element.textContent
//         )
//     );

//     //Create hrefs Array From Div With .EDblX Classname => 
//     //Its First Element (div .B8oxKe) ==> Its 1st Element <span>(DaDV9e) =>
//     //Finally The href Inside Of The Span
//     const hrefs = await page.evaluate(() =>
//         Array.from(
//             document.querySelectorAll(".EDblX"),
//             (element) =>
//                 element.firstElementChild.firstElementChild.firstElementChild.href
//         )
//     );
// console.log(descriptions)
//     //Close Browser to keep the functon from running forever
//     browser.close();
};


//AQEDATQm068EBQUAAAABfqHi9UkAAAF-8KBmYk4AcE5i4YilZooiCk5hIN4fnnjPSxuvlaiOcmXTATCXBvBUtCXe5Yhs1fLw3iwDRy4-bi91Bruufj0lw2hgVjnuzuSOtww43u9flF67Es8HqFYKn309


//Launch Chromium, Open New Page, Navigate To URL
async function getLinkedInJobs(resp) {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForTimeout(1000);
    resp(await page.content());
    browser.close();
}

function getJobList(data) {
    //console.log("DATA", data)
    const $ = cheerio.load(data)
    let myJobs = []
    $('[class$="jobs-search__results-list"]')
    .children('li')
         .each(function (i, el) {
            myJobs.push({ title: $(el).text().replace(/(\r\n|\n|\r)/gm,""), link: $(el).attr('href') })
          })
         //myJobs.push({ title: $(el).text().replace(/(\r\n|\n|\r)\s+/gm,""), link: $(el).attr('href') })
   console.log("Jobs: ", myJobs)
}

    
module.exports = { getLinkedInJobs, getJobList, getMyLinkedInJobs };