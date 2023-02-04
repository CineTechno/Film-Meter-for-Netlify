const puppeteer = require("puppeteer-core");
const chromium = require("chrome-aws-lambda");

exports.handler = async function (event, context) {
  const film = JSON.parse(event.body);

  //   console.log(film.title);

  const browser = await puppeteer.launch({
    args: [
      ...chromium.args,
      "--disable-features=AudioServiceOutOfProcess",
      "--disable-gpu",
      "--disable-software-rasterize",
    ],
    executablePath:
      process.env.CHROME_EXECUTABLE_PATH || (await chromium.executablePath),
    headless: chromium.headless,
    defaultViewport: chromium.defaultViewport,
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
  });
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36"
  );
  await page.goto("https://www.filmweb.pl/", { waitUntil: "networkidle0" });
  // await page.waitForTimeout(1000);
  await page.click("#didomi-notice-agree-button");
  await page.waitForSelector("#inputSearch");

  await page.type("#inputSearch", film.title);
  await page.waitForTimeout(900);
  await page.keyboard.press("Enter");
  await page.waitForTimeout(900);
  filmwebRating = await page.evaluate(() => {
    rating = document.querySelector(".communityRatings__value").textContent;
    return rating;
  });
  await browser.close();

  return {
    statusCode: 200,
    body: JSON.stringify({ filmwebRating }),
  };
};
