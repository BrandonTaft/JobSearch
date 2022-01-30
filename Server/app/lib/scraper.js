const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const sendMail = require('./mailer.js');

const url = 'https://www.google.com/search?q=junior+software+developer&oq=jobs&aqs=chrome.0.69i59j35i39j69i61j69i60l2j69i65l2j69i60.1833j0j7&sourceid=chrome&ie=UTF-8&ibp=htl;jobs&sa=X&ved=2ahUKEwi68fG8ltj1AhXqSzABHaZzDIkQutcGKAF6BAgdEAc&sxsrf=APq-WBu0mXRjusT5stuRXp-6ucGMTdP1-g:1643501038902#fpstate=tldetail&htivrt=jobs&htidocid=thL_GrIFsJIAAAAAAAAAAA%3D%3D';
//const url = 'https://www.youtube.com/user/RichEisenShow/videos';
async function fetchFromGoogle(resp) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url)
    resp(await page.content())
    browser.close()
}

function getLatestJobs(data) {
    const $ = cheerio.load(data)
    let Jobs = []
     $('li .BjJfJf')
    //$('div #details')
    //$('div .style-scope')
        .each(function (i, el) {
            Jobs.push({ title: $(el).text()})
        })
    return console.log("Jobs: ",Jobs[0])
}

// function getLatestJobs(data) {
//     const $ = cheerio.load(data)
//     let Jobs = []
//     $('li .iFjolb')
//         .children('div .BjJfJf')
//         .children('h3')
//         .children('a')
//         .each(function (i, el) {
//             Jobs.push({ title: $(el).text(), link: $(el).attr('href') })
//         })
//     return Jobs[0]
// }

module.exports = {getLatestJobs, fetchFromGoogle}