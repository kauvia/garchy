const axios = require("axios");
const model = require("../../models");
const api = require("./apis");

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
      axios
        .all([
          axios.get(`https://api.iextrading.com/1.0/stock/${symb}/company`),
          axios.get(`https://api.iextrading.com/1.0/stock/${symb}/financials`),
          // axios.post("http://localhost/ocpu/library/garchR/R/gbmgarch", {
          //   ticker: symb
          // })
        ])
        .then(
          axios.spread((val1, val2, val3) => {
            let stockData = val1.data;
            //processing OCPU data

            // let tempArr = val3.data.split(/\n/);
            // tempArr = tempArr[0].split('/');
            // let ocpuURL = `http://localhost/ocpu/tmp/${tempArr[3]}/graphics/1`

            //Sentiments

            stockData.sentiments ={twitter:0.200, google: 0.08} //dummy?

            //the rest

            stockData.financials = val2.data.financials;
            stockData.forecastURL = "https://canvasjs.com/wp-content/uploads/images/gallery/php-charts/overview/php-charts-graphs-index-data-label.png";
            res.status(200).send({ success: true, stockdata: stockData });
          })
        );
    });
  }
  static updateOne(req, res) {}
  static deleteOne(req, res) {}
}
module.exports = Stocks;
