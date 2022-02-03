const puppeteer = require('puppeteer');
const fs = require('fs/promises');
const cron = require('node-cron');

// *******************TAKE SCREENSHOT OF WEBPAGE ****************************

//Use async to be able to use await for chromium 
async function start() {

    // Launch Chromium and wait for it to load
    const browser = await puppeteer.launch();

    //Once Chromium loads it opens a new page
    const page = await browser.newPage();
    
    //then navigates to the provided url
    await page.goto('https://en.wikipedia.org/wiki/Fallout_(video_game)');

    //take screenshot of url, gives it a name, tells it to shoot the whole page
    await page.screenshot({path: "give-it-a-filename.png", fullPage: true})

    //close browser or itll sit there and keep running
    await browswer.close()

}
    
// ********************** GET DATA FROM PAGE **********************

//Use async to be able to use await for chromium 
async function start() {

    // Launch Chromium and wait for it to load
    //IN THIS FUNCTION YOU ARE IN CHROMIUM!!
    //SO CONSOLE.LOG WILL PRINT TO THE CHROMIUM CONSOLE, NOT NODE
    const browser = await puppeteer.launch();

    //Once Chromium loads it opens a new page
    const page = await browser.newPage();
    
    //then navigates to the provided url
    await page.goto('https://learnwebcode.github.io/practice-requests/');

    //document.querySelectorAll(".info strong")
    //selects elements with class name info and css selector strong
    //and returns a node list of elements
    //so add Array.from to create an array with the data
    //use .map to create a new array with elements returned from a function
    //use an arrow function to return text content for each element in the array
    //by using the node property textContent
    const names = await page.evaluate(() =>{
        return Array.from(document.querySelectorAll(".info strong")).map( x => x.textContent)
    })

    //take array of strings and creates a text file called names.txt
    //.join takes out of array and defines /r/n as the seperator
    //which is return and new line 
    await fs.writeFile("names.txt", names.join("/r/n"))



//**************    CLICK BUTTON AND GET DATA ************************* */

    //use page.click to click button 
    //and get data that shows in the element that appears after click  
    await page.click("#clickme")
    //could use evaluate  but since we only want first instance of id
    //we can use $eval the single $ gives 1st instance of element
    //el is the selected element
    //#data is the empty div that fills when btn is clicked
    //if stay on same line no need to type return
    const clickedData = await page.$eval("#data", el => el.textContent)
    console.log(clickedData)



// *******************GET AND SAVE IMAGES FROM WEB PAGE ********************

    //$$eval is a more specific search, and returns an array, not node list
    // it will specifically get multiple elements
    //1st param is the element you want, 2nd is a function
    const photos = await page.$$eval("img", (imgs) => {
        //returns array of image urls
        return imgs.map(x => x.src)
    })

    //loop thru and save to hd, with forOf which allows await syntax
    for (const photo of photos){
        //create new tab for photo and got to photo url
        const imagePage = await page.goto(photo)
        //just write the last part of url after the final forward slash
        //.split turns string of text to array and split based on forward slashes
        //.pop will give final item in new array
        //contents of file we want to save to hard drive
        await fs.writeFile(photo.split("/").pop(), await imagePage.buffer())


    }

    
    //close browser or itll sit there and keep running
    await browswer.close()

}
    //run every 5 secs
    //cron.schedule("*/5 * * * * *", start)
    start()