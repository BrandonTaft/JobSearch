const puppeteer = require('puppeteer');
const schedule = require('node-schedule');
const Job = require('../models/Job');
const url = 'https://www.linkedin.com/jobs/entry-level-web-developer-jobs-united-states/?f_E=2&f_JT=F&f_PP=106224388&geoId=103644278';

function linkedInJobs(titles, companies, locations, hrefs) {
    for (i = 0; i < titles.length; i++) {
        const job = new Job({
            service: "LinkedIn",
            title: titles[i],
            company: companies[i],
            location: locations[i],
            href: hrefs[i],
            saved: false
        });
        job.save().then(function () {
            console.log(job);
        }).catch((error) => console.log(error));
    }
}



function startGetLinkedInJobs() {
    //Run At 730am Daily: '30 7 * * *' ,  Test: '37 * * * *' Runs on 37th Minute
    schedule.scheduleJob('30 7 * * *',
        async function getLinkedInJobs() {
            const browser = await puppeteer.launch({
                headless: false
            });
            const page = await browser.newPage();
            await page.goto(url);
            await page.waitForTimeout(1000);

            const titles = await page.evaluate(() =>
                Array.from(
                    document.querySelectorAll('.base-search-card__title'),
                    (element) => element.textContent //.replace(/(\r\n|\n|\r)/gm, "")
                )
            );

            let companies = await page.evaluate((req, res) =>
                Array.from(
                    document.querySelectorAll('.base-search-card__subtitle'),
                    (element) => element.textContent
                )
            );

            let locations = await page.evaluate((req, res) =>
                Array.from(
                    document.querySelectorAll('.job-search-card__location'),
                    (element) => element.textContent
                )
            );

            let hrefs = await page.evaluate(() =>
                Array.from(
                    document.querySelectorAll('.base-card__full-link'),
                    (element) =>
                        element.href
                )
            );

            // let details = await page.evaluate((req, res) =>
            //     Array.from(
            //         document.querySelectorAll('.show-more-less-html__markup'),
            //         (element) => element.textContent
            //     )
            // );

            browser.close();
            linkedInJobs(titles, companies, locations, hrefs);
        }
    )
};

module.exports = { startGetLinkedInJobs };