const express = require("express");
const app = express();
const http = require("http").Server(app);
const bodyParser = require("body-parser");
const routes = require("./server/routes");

const hostname = "127.0.0.1";
const port = 3001;

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

http.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
/////                 TESTING AND PRE-PROD SETUP          //////
const axios = require("axios");
const fs = require("fs");
const jsonfile = require("jsonfile");
const stockArr = { stocks: [] };
const Twit = require("twit");
const {
  consumerKeyT,
  consumerSecretT,
  accessTokenT,
  accessSecretT,
  googleAPI
} = require("./server/config/config");
const Sentiment = require("sentiment");

let T = new Twit({
  consumer_key: consumerKeyT,
  consumer_secret: consumerSecretT,
  access_token: accessTokenT,
  access_token_secret: accessSecretT
});

const getTwitterSentiments = query => {
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
      let averageScore = 0;
      for (let i = sentimentResults.length - 1; i >= 0; i--) {
        averageScore += sentimentResults[i];
        if (i == 0) {
          averageScore = averageScore / sentimentResults.length;
        }
      }
      console.log(averageScore, " twitter average score");
    }
  );
};

const getGoogleSentiments = query => {
  let newsArr = [];
  let sentimentsResults = [];
  axios
    .get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${googleAPI}`)
    .then(val => {
      console.log(val.data)
      val.data.articles.map(item => {
        if(item.description){
        newsArr.push(item.description)}
        else if (item.content){
          newsArr.push(item.content)
        } else if (item.title){
          newsArr.push(item.title)
        } else {newsArr.push("John")};  //neutral keyword
      });
      newsArr.map(txt => {
        let S = new Sentiment();
     //   console.log(txt);
        let result = S.analyze(txt);
        if (result.score != 0) {
          sentimentsResults.push(result.comparative);
        }
      });
      let averageScore = 0;
      for (let i = sentimentsResults.length-1;i>=0;i--){
        averageScore+=sentimentsResults[i];
        if (i==0){
          averageScore=averageScore/sentimentsResults.length
        }
      }
      console.log(averageScore," google news average score")
    });

};
//  getGoogleSentiments("GE");
//  getTwitterSentiments("GE");

const getForcast = (symb) => {
  axios.post(`https://api.iextrading.com/1.0/stock/${symb}/financials`),
  then(val=> {
    let tempArr = val.data.split(/\n/);
    tempArr = tempArr[0].split('/');
    let ocpuURL = `http://localhost/ocpu/tmp/${tempArr[3]}/R/.val`;
  })
}




// const getStockInfo = () => {
//   axios.get("https://api.iextrading.com/1.0/ref-data/symbols").then(val => {
//     val.data.map(stock => {
//       if (stock.type == "cs" && stock.isEnabled) {
//         stockArr.stocks.push(stock);
//       }
//     });
//     console.log(stockArr.stocks.length);
//   });
// };

// getStockInfo();

// const writeStockInfo = () => {
//   jsonfile.readFile("stocks.json", (err, data) => {
//     jsonfile.writeFile("stocks.json", stockArr).then(res => {
//       console.log("finished writing");
//       jsonfile.readFile("stocks.json", (err, data) => {
//         console.log(data.length);
//       });
//     });
//   });
// };

// const { Stocks } = require("./server/controllers");
// const runUpload = () => {
//   console.log("uploading");
//   jsonfile.readFile("stocks.json", (err, data) => {
//     let stockArr = data.stocks;
//     console.log(stockArr.length);
//       Stocks.uploadStocks(stockArr)  //JUST IN CASE
//   });
// };

//runUpload()                //DONT RUN UNLESS STOCKDATABASE IS EMPTY
// jsonfile.readFile("stocks.json",(err,obj)=>{
//   console.log(obj.stocks.length);
//   obj.stocks.map(val=>{
//     obj.stocks.map(inner=>{
//       if (val.symbol==inner.symbol){
//         if (val.name!=inner.name){
//           console.log('same symbol but diffenrent companies',val,inner)
//         }
//       }
//     });console.log('searching')
//   });console.log('end of search')
// })

// const makeOCPURequest = (req, res) => {
//   console.log(req.body);
//   axios
//     .post("http://localhost/ocpu/library/garchR/R/gbmgarch", {
//       ticker: req.body.ticker
//     })
//     .then(rest => processOCPU(rest.data, res))
//     .catch(err => {
//       console.log(err);
//     });
// };

// const processOCPU = (req, res) => {
//   console.log(req);
//   let tempArr = req.split(/\n/);
//   tempArr = tempArr[0].split("/");
//   let tempKey = tempArr[3];
//   res.send({ image: `http://localhost/ocpu/tmp/${tempKey}/graphics/1` });
// };

// app.post("/home", makeOCPURequest);
