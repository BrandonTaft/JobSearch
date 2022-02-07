const puppeteer = require('puppeteer');
const fs = require('fs/promises');
const url = "https://www.brandontaft.net/"
async function getInfo() {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
//use .type to enter text in an input box
//1st argument is the selector of box
//2nd is what you want typed in
//MOST SITES YOU CAN USE JS TO SUBMIT FORM instead of clicking btn
// USE waitForNavigation to wait on page once btn is clicked
//use  $eval to get info from element on new page
await page.type("#fullname", "Brandon")
// Promise.all fot the 2 functions to keep from getting errors
//Promise.all returns an array
  //await Promise.all([page.click("#submit"), page.waitForNavigation()])
  //const info = await page.$eval("#message", el => el.textContent)
await page.click(contact-form > div.controls > div > div.col-md-12.text-center > button)
  //console.log(info)
  await page.screenshot({path: "test.png", fullPage: true})

    //close browser or itll sit there and keep running
    await browser.close()

   

}
module.exports.getInfo = getInfo