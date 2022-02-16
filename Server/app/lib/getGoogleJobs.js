const puppeteer = require('puppeteer');
const schedule = require('node-schedule');
const Job = require('../models/Job');
const url = 'https://www.google.com/search?q=software+developer+entry+level+jobs&oq=jobs&aqs=chrome.0.69i59j35i39j69i60j69i61j69i60j69i65l2j69i60.3120j0j7&sourceid=chrome&ie=UTF-8&ibp=htl;jobs&sa=X&ved=2ahUKEwiho8eg8e31AhXiJ0QIHacyADQQutcGKAF6BAgdEAc&sxsrf=APq-WBsSjwLqc69srREBSjLQ9bSuOoZ5DA:1644246961616#fpstate=tldetail&htivrt=jobs&htidocid=EaIjisjqEGsAAAAAAAAAAA%3D%3D';

function googleJobs(titles, hrefs, descriptions) {
    for (i = 0; i < titles.length; i++) {
        for (i = 0; i < hrefs.length; i++) {
            for (i = 0; i < descriptions.length; i++) {
                const job = new Job({
                    title: titles[i],
                    href: hrefs[i],
                    description: descriptions[i]
                });
                job.save().then(function () {
                    console.log(job);
                }).catch((error) => console.log(error));
            }
        }
    }
}
function startGetGoogleJobs() {
    schedule.scheduleJob('0 13 * * *',
        async function getGoogleJobs() {
            const browser = await puppeteer.launch({
                headless: false
            });
            const page = await browser.newPage();
            await page.goto(url);
            await page.waitForTimeout(1000);

            let titles = await page.evaluate((req, res) =>
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

            let hrefs = await page.evaluate(() =>
                Array.from(
                    document.querySelectorAll(".EDblX"),
                    (element) =>
                        element.firstElementChild.firstElementChild.firstElementChild.href
                )
            );

            browser.close();
            googleJobs(titles, hrefs, descriptions);

        }
    )};


    module.exports = { startGetGoogleJobs };