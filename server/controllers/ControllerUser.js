"use strict";
const { User } = require("../models");
const { hashing, compare } = require("../helpers/hashingPass");
const jwt = require("jsonwebtoken");

class ControllerUser {
  static register(req, res, next) {
    // console.log("Masuk");
    const { email, password, admin } = req.body;
    // console.log(email, password, admin);
    const hashing1 = hashing(password);
    // console.log(hashing1);
    User.create({
      email: email,
      password: hashing1,
      admin: admin
    })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err);
      });
  }

  static login(req, res, next) {
    const { email, password } = req.body;
    // console.log("masukkkk??");
    // console.log(email);
    User.findOne({
      where: {
        email: email
      }
    })
      .then(result => {
        console.log(result, "cuyyyyy");
        if (result && compare(password, result.password)) {
          let token = jwt.sign(
            {
              id: result.id,
              email: result.email,
              // admin: result.admin
            },
            process.env.secret
          );
          res.status(200).json({ token });
        } else {
          throw {
            status: 404,
            msg: "wrong email or password"
          };
        }
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  }
}

module.exports = ControllerUser;
