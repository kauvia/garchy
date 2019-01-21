const { Users, Stocks } = require("../controllers");
const {  checkToken } = require("../authentications");
//use checkToken to auth users at secure endpoints

module.exports = app => {
  //User login, creation, and validations
  app.post("/users/new", Users.createNew);
  app.post("/login", Users.login);
  app.get("/validate",checkToken)

  app.post("/search",checkToken,Stocks.getOne)
  app.post("/watchlist/add",checkToken,Users.addStock)
};
