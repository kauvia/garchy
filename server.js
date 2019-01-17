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

const axios = require("axios");

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


