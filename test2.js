// speedtest.js
// author: bashow
// 2020/07/18

// Requirements:
// sudo apt install chromium-browser
// sudo apt install npm
// npm i puppeteer
// npm i speedline

// Hot to use:
// node speedtest.js <url>

const puppeteer = require('puppeteer-core');

var url = process.argv[2];
var video_urls = [];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox']});
  const page = await browser.newPage();
  // await page.setDefaultNavigationTimeout(60000);

  try {
    await page.goto(url, { waitUntil: 'networkidle0' });
    // await page.waitForSelector('#content_filters', { visible: true, timeout: 60000 });
    console.log("測定開始");
    var items = await page.$$('.title');
    console.log(items.length);
    for (var i = items.length - 1; i >= 0; i--) {
      video_url = await (await items[i].getProperty('href')).jsonValue();
      if (video_url != undefined) video_urls.push(video_url);
    }
  } catch (e) {
    console.error(e);
  }
  // await page.screenshot({path: 'screenshot.png'});

  console.log(video_urls);
  
  const video_page = await browser.newPage();

  try {
    console.log(video_urls[0]);
    await video_page.goto(video_urls[0] + "popout/", { waitUntil: 'networkidle0' });
    // await page.waitFor(100000);
    // console.log("video開始");
    // var link = await video_page.$eval("#video", element=> element.src)
    // await console.log(link)
    var items = await video_page.$$('.circles');
    console.log(items);
    await items[0].click();

    // console.log(item);
    // await item.click();
    
  } catch (e) {
    console.error(e);
  }
  // await page.screenshot({path: 'screenshot.png'});

  await browser.close();

})();

