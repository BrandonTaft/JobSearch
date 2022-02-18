const puppeteer = require('puppeteer');
const schedule = require('node-schedule');
const Job = require('../models/Job');
const url = 'https://www.linkedin.com/jobs/entry-level-web-developer-jobs-united-states/?f_E=2&f_JT=F&f_PP=106224388&geoId=103644278';

function linkedInJobs( titles, companies, locations, hrefs, descriptions) {
    for (i = 0; i < titles.length; i++) {
        for (i = 0; i < hrefs.length; i++) {
            for (i = 0; i < descriptions.length; i++) {
                const job = new Job({
                    service: "LinkedIn",
                    title: titles[i],
                    company: companies[i],
                    location: locations[i],
                    href: hrefs[i],
                    description: descriptions[i],
                    saved: false
                });
                job.save().then(function () {
                    console.log(job);
                }).catch((error) => console.log(error));
            }
        }
    }
}

function startGetLinkedInJobs() {
    //Run At 7am Daily: '0 7 * * *' ,  Test: '37 * * * *' Runs on 37th Minute
   schedule.scheduleJob('11 * * * *',
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
    console.log(info)
    //linkedInJobs(info, titles, companies, locations, hrefs, descriptions);
}
   )};

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



module.exports = { startGetLinkedInJobs };