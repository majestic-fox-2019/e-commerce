"use strict";
const { UserProduct } = require("../models");

function authorization(req, res, next) {
  console.log(req.user.id, "ini authorization");

  // UserProduct
  //   .findOne({
  //     where: {
  //     UserId : req.user.id
  //   }
  // })
}

module.exports = authorization;
