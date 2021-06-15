const express = require("express");
const app = express();
const port = 3000;
const scrapper = require("./scrapper");
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // to disable security on local machine or browser
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/creators", async (req, res) => {
  const creators = await db.getAllCreators();
  // todo: Get from Db
  res.send(creators);
});

app.post("/creators", async (req, res) => {
  console.log(req.body);
  // todo: scrape channel
  const channelData = await scrapper.scrapeChannel(req.body.channelURL);

  //todo: add to db
  const creators = await db.insertCreators(
    channelData.name,
    channelData.avatarURL,
    req.body.channelURL
  );
  res.send(Creators);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
