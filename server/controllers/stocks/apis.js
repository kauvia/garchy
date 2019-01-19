const axios = require("axios");

module.exports = {
  iexdata: symb => {
    let info = { company: null, financials: null };
    axios.all([
      axios.get(`https://api.iextrading.com/1.0/stock/${symb}/company`),
      axios.get(`https://api.iextrading.com/1.0/stock/${symb}/financials`)
    ]).then(axios.spread((val1,val2)=>{
    //    console.log(val1.data)
        return val1
    }));
  },
  test2: symb => {
    console.log(dd);
  }
};
