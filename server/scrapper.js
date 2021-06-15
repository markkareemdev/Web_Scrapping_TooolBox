const puppeteer = require("puppeteer");

async function scrapeChannel(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  try {
    //channel name
    const e1 = await page.$x('//*[@id="text"]');
    // const result = await page.$x(
    //   "/html/body/ytd-app/div/ytd-page-manager/ytd-search/div[1]/ytd-two-column-search-results-renderer/div/ytd-section-list-renderer/div[2]/ytd-item-section-renderer/div[3]/ytd-channel-renderer/div/div[2]/a/div[1]/ytd-channel-name/div/div/yt-formatted-string"
    // );
    const text = await e1.getProperty("textContent");
    console.log(text)
    // const name = await text.jsonValue();

    // /html/body/ytd-app/div/ytd-page-manager/ytd-search/div[1]/ytd-two-column-search-results-renderer/div/ytd-section-list-renderer/div[2]/ytd-item-section-renderer/div[3]/ytd-channel-renderer/div/div[2]/a/div[1]/ytd-channel-name/div/div/yt-formatted-string

    //channel image
    const [e2] = await page.$x('//*[@id="img"]');
    const src = await e2.getProperty("src");
    const avatarUrl = await src.jsonValue();

    // console.log({ name, avatarUrl });

    browser.close();
    // return { name, avatarUrl };
  } catch (error) {
    console.log(error);
  }
}

scrapeChannel("https://www.youtube.com/channel/UCRLEADhMcb8WUdnQ5_Alk7g");

// module.exports.scrapeChannel = scrapeChannel;
