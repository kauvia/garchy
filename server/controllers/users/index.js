const model = require("../../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { User, Stock } = model;

const jwt = require("jsonwebtoken");
const { secret } = require("../../config/config");

class Users {
  static createNew(req, res) {
    console.log(req.body);
    const { username, password } = req.body;
    return User.findOne({ where: { name: username } }).then(user => {
      if (user) {
        //     res.setHeader("Content-Type", "application/json");
        res
          .status(200)
          .send({ success: false, message: "Username already taken." });
      } else {
        bcrypt.hash(password, saltRounds).then(hash => {
          return User.create({
            name: username,
            password: hash
          }).then(val => {
            let token = jwt.sign({ username: username }, secret, {
              expiresIn: "24h"
            });
            res
              .status(200)
              .send({ success: true, message: "created user", token: token });
          });
        });
      }
    });
  }
  static listAll(req, res) {
    return User.findAll({ attributes: ["name"] }).then(users => {
      res.status(200).send(users);
    });
  }
  static getOne(req, res) {}
  static updateOne(req, res) {}
  static deleteOne(req, res) {}

  static addStock(req, res) {
    console.log(req.decoded, req.body);
    let symb = req.body.symbol;
    let user = req.decoded.username;
    console.log(symb, user);
    return User.findAll({ include: [{ model: Stock }] }).then(user => {
      console.log(user);
    });
  }

  static login(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {
      return User.findOne({ where: { name: username } }).then(user => {
        if (user) {
          if (user.dataValues.name === username) {
            bcrypt.compare(password, user.dataValues.password).then(val => {
              if (val) {
                let token = jwt.sign({ username: username }, secret, {
                  expiresIn: "24h"
                });
                res.json({
                  success: true,
                  message: "Authentication successful",
                  token: token
                });
              } else {
                res.json({
                  success: false,
                  message: "Incorrect username or password."
                });
              }
            });
          }
        } else {
          res.json({
            success: false,
            message: "Incorrect username or password."
          });
        }
      });
    } else {
      res.json({ sucess: false, message: "Authentication failed" });
    }
  }
}
module.exports = Users;
