const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const sendMail = require('./mailer.js');

const url = 'https://www.google.com/search?q=software+engineer+jobs&oq=google+jobs&aqs=chrome..69i57j69i59l2j0i131i433i512j69i60l2j69i65j69i60.2604j0j7&sourceid=chrome&ie=UTF-8&ibp=htl;jobs&sa=X&ved=2ahUKEwjYzsSh3d_1AhWmmGoFHSq7DQ8QutcGKAF6BAglEAc&sxsrf=APq-WBsRh7LEHGYChFvl4lzxUXxQsBjibw:1643760558632#fpstate=tldetail&htivrt=jobs&htichips=requirements:no_experience,requirements:no_degree&htischips=requirements;no_experience;no_degree&htidocid=NJh2CPSfAOgAAAAAAAAAAA%3D%3D';
//const url = 'https://www.youtube.com/user/RichEisenShow/videos';

async function getJobs() {
    // Launch Chromium and wait for it to load
    const browser = await puppeteer.launch({
        headless: false
    });
    //Once Chromium loads it opens a new page
    const page = await browser.newPage();
    //then navigates to the provided url
    await page.goto(url);
    await page.waitForTimeout(1000);
    let titles = await page.evaluate(() =>
        Array.from(
            document.querySelectorAll('.BjJfJf'),
            (element) => element.textContent
        )
    )
    // const description = await page.content();
    // console.log("Description: ", description)
    // await browser.close();


    const hrefs = await page.evaluate(() =>
        Array.from(
            document.querySelectorAll(".EDblX"),
            (element) =>
                element.firstElementChild.firstElementChild.firstElementChild.href
        )
    );
    console.log(titles)
    //Close Browser to keep the functon from running forever
    browser.close();
};

function getLatestJobs(data) {
    //     const $ = cheerio.load(data, null, false)
    //     //let Jobs = []

    //     // $("ul")
    //     //     .children("li")
    //     // .children('div #meta')
    //     // .children('h3')
    //         // .each(function (i, el) {
    //         //     Jobs.push({ title: $(el).text()})
    //         // })
    //     console.log("this", $.html())
}

//function sortJobs() {
//     const string = ""
//     getJobs((data) => {
//         console.log("test",getLatestJobs(data))
//     })
//}

module.exports = { getLatestJobs, getJobs }