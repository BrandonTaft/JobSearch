const puppeteer = require('puppeteer');
const fs = require('fs/promises');


//use .type to enter text in an input box
//1st argument is the selector of box
//2nd is what you want typed in
//MOST SITES YOU CAN USE JS TO SUBMIT FORM instead of clicking btn
// USE waitForNavigation to wait on page once btn is clicked
//use  $eval to get info from element on new page
await page.type("#ourfield", "blue")
// Promise.all fot the 2 functions to keep from getting errors
//Promise.all returns an array
  await Promise.all([page.click("#ourform button"), page.waitForNavigation()])
  const info = await page.$eval("#message", el => el.textContent)

  console.log(info)