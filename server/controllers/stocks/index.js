const axios = require("axios");
const model = require("../../models");
const api = require("./apis");
const Twit = require("twit");
const {
  consumerKeyT,
  consumerSecretT,
  accessTokenT,
  accessSecretT,
  googleAPI
} = require("../../config/config");
const Sentiment = require("sentiment");

let T = new Twit({
  consumer_key: consumerKeyT,
  consumer_secret: consumerSecretT,
  access_token: accessTokenT,
  access_token_secret: accessSecretT
});

const { Stock } = model;

class Stocks {
  static uploadStocks(req, res) {
    req.map(item => {
      let name = item.name;
      let symbol = item.symbol;
      return Stock.findOne({ where: { symbol: symbol } }).then(stock => {
        if (stock != true) {
          return Stock.create({
            name: name,
            symbol: symbol
          }).then(inner => {
            console.log(inner);
          });
        }
      });
    });
  }

  static getOne(req, res) {
    let query = req.body.query.toUpperCase();
    return Stock.findOne({ where: { symbol: query } }).then(stock => {
      let symb = stock.symbol;
      let twitterAveScore = 0;
      T.get(
        "search/tweets",
        { q: query, count: 100, result_type: "popular" },
        (err, data, res) => {
          let tweets = data.statuses;
          let tweetsTextArr = [];
          tweets.map(item => {
            tweetsTextArr.push(item.text);
          });
    
          let sentimentResults = [];
          tweetsTextArr.map(txt => {
            let S = new Sentiment();
       //     console.log(txt);
            let result = S.analyze(txt);
            if (result.score != 0) {
              sentimentResults.push(result.comparative);
            }
          });
          // console.log(sentimentResults);

          for (let i = sentimentResults.length - 1; i >= 0; i--) {
            twitterAveScore += sentimentResults[i];
            if (i == 0) {
              twitterAveScore = twitterAveScore / sentimentResults.length;
            }
          }
          console.log(twitterAveScore, " twitter average score");
        }
      );
      axios
        .all([
          axios.get(`https://api.iextrading.com/1.0/stock/${symb}/company`),
          axios.get(`https://api.iextrading.com/1.0/stock/${symb}/financials`),
          axios.post("http://localhost/ocpu/library/garchR/R/gbmgarch", {
            ticker: symb
          }),
          axios.get(
            `https://newsapi.org/v2/everything?q=${symb}&apiKey=${googleAPI}`
          )
        ])
        .then(
          axios.spread((val1, val2, val3,val4) => {
            let stockData = val1.data;
            //      processing OCPU data

            let tempArr = val3.data.split(/\n/);
            tempArr = tempArr[0].split("/");
            let ocpuURL = `http://localhost/ocpu/tmp/${tempArr[3]}/R/.val`;

            //Sentiments
            let googleNewsArr=[];
            let googleSentimentResults=[];
            val4.data.articles.map(item=>{
              if(item.description){
                googleNewsArr.push(item.description)}
                else if (item.content){
                  googleNewsArr.push(item.content)
                } else if (item.title){
                  googleNewsArr.push(item.title)
                } else {googleNewsArr.push("John")};  //neutral keyword
            })
            googleNewsArr.map(txt=>{
              let S = new Sentiment();
              let result = S.analyze(txt);
              if (result.score!=0){
                googleSentimentResults.push(result.comparative)
              }
            })
            let googleAveScore = 0;
            for (let i = googleSentimentResults.length-1;i>=0;i--){
              googleAveScore+=googleSentimentResults[i];
              if (i==0){
                googleAveScore=googleAveScore/googleSentimentResults.length
              }
            }

            console.log(googleAveScore, " goog average score");


            stockData.sentiments = { twitter: twitterAveScore, google: googleAveScore }; //dummy?

            //the rest

            stockData.financials = val2.data.financials;
            stockData.forecastURL = ocpuURL;
            res.status(200).send({ success: true, stockdata: stockData });
          })
        );
    });
  }
  static updateOne(req, res) {}
  static deleteOne(req, res) {}
}
module.exports = Stocks;
