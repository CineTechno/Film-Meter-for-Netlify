const puppeteer = require("puppeteer");

async function run(film) {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: false,
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

    await page.type("#inputSearch", film);
    await page.waitForTimeout(1000);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(1000);
    filmwebRating = await page.evaluate(() => {
      rating = document.querySelector(".communityRatings__value").textContent;
      return rating;
    });
    return await filmwebRating;
  } catch (err) {
    console.log(err);
  }
}

(async function () {
  let filmwebRating = await run("Szczeki");
  console.log(filmwebRating);
})();

// const getRating = async function () {
//   const { data: html } = await axios.get(
//     "https://www.filmweb.pl/search#/?query=the%20last%20of"
//   );

//   return html;
// };

// getRating().then((res) => {
//   const $ = cheerio.load(res);
//   console.log($("#\\38 49662 > div > div.preview__header > h2 > a").parentNode);
// });

//     );
//     const $ = await cheerio.load(data.data);
//     const previewLink = await $(".communityRatings__rating").html();
//     await console.log(previewLink);
//   } catch (err) {
//     console.log(err);
//   }
// };

// getRating();

// axios
//   .get("https://www.filmweb.pl/film/Duchy+Inisherin-2022-856901")
//   .then(({ data }) => {
//     const $ = cheerio.load(data);

//     const rating = $(".filmRating");
//     console.log(rating);
//   });
