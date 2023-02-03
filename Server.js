const express = require("express");
const cors = require("cors");
const app = express();
const puppeteer = require("puppeteer");

app.use(cors());

app.get("/", async (req, res) => {
  const film = await run("Last of us");
  await res.send({ value: film });
  // .status(200)
  // .json({ message: "Hello from the server!", app: "FilmRating" });
});

app.post("/", (req, res) => {
  res.send("Post something");
});

const port = 3000;
app.listen(port, () => {
  console.log("Hello");
});

run = async function (film) {
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
    return filmwebRating;
  } catch (err) {
    console.log(err);
  }
};
