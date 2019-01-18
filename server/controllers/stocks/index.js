const model = require("../../models");

const { Stock } = model;

class Stocks {
  static uploadStocks(req,res){
    req.map(item=>{
      let name =item.name;
      let symbol = item.symbol;
      return Stock.findOne({where: {symbol:symbol}}).then(stock=>{
        if (stock!=true){
          return Stock.create({
            name:name,
            symbol:symbol
          }).then(inner=>{
            console.log(inner)
          })
        }
      })
    })
  }

  static getOne(req, res) {
    let query = req.body.query.toUpperCase();
    console.log(query)
    return Stock.findOne({where:{symbol:query}}).then(stock=>{
      console.log(stock)
      res.status(200).send({success:true,stockdata:stock})

    })
  }
  static updateOne(req, res) {}
  static deleteOne(req, res) {}

 
}
module.exports = Stocks;
