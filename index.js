const Sentiment = require("sentiment");

let sentiment = new Sentiment();
let result = sentiment.analyze("");

const express = require("express");
const app = express();
const http = require("http").Server(app);
const bodyParser = require("body-parser");
const axios = require("axios");
const cheerio = require("cheerio");

//const routes = require('./server/routes')

const hostname = "127.0.0.1";
const port = 3001;

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes(app);

app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to the default API route"
  })
);

http.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

let searchTerm = "alphabet inc.";
let url;

axios
  .get(
    `https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchTerm}&limit=0&namespace=0|1&format=json`
  )
  .then(response => {
    let data = response.data;
    url = data[data.length - 1][0];
    //console.log(url);
    scraper(url);
  })
  .catch(error => {
    console.log(error);
  });

const scraper = url => {
  axios
    .get(url)
    .then(res => {
      const $ = cheerio.load(res.data);
      console.log(typeof res.data);
      const data = $('tbody','.infobox*').text();
      console.log(data);
      debugger;
    })
    .catch(error => {
      console.log(error);
    });
};
