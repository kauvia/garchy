//const model = require("../../models");

//const { Stock } = model;

class Stocks {


  static getOne(req, res) {
    let query = req.body.query
    console.log(query)
    res.status(200).send({success:true,stockdata:{name:query,charturl:"a url",stuff:'stuff'}})
  }
  static updateOne(req, res) {}
  static deleteOne(req, res) {}

 
}
module.exports = Stocks;
