"use strict";

let { Product } = require("../models");
// name: DataTypes.STRING,
//   image_url: DataTypes.STRING,
//     price: DataTypes.INTEGER,
//       stock: DataTypes.INTEGER

class ControllerProduct {
  static add(req, res, next) {
    let { name, image_url, price, stock, rating, description } = req.body;
    let numrating = Number(rating)
    Product.create({
      name,
      image_url,
      price,
      stock,
      rating: numrating,
      description
    })
      .then(result => {
        res.status(201).json(result);
      })
      .catch(err => {
        console.log(err, "ini error");
        next(err);
      });
  }

  static findAll(req, res, next) {
    Product.findAll()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  }

  static findOne(req, res, next) {
    let ProductId = req.params.id;
    Product.findOne({
      where: {
        id: ProductId
      }
    })
      .then(result => {
        console.log(result, "HELO HELO JO");

        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err, "EROR FIND ONE WOE");
        next(err);
      });
  }

  static destroy(req, res, next) {
    let ProductId = req.params.id;
    let findOne = Product.findOne({
      where: {
        id: ProductId
      }
    });
    let destroy = Product.destroy({
      where: {
        id: ProductId
      }
    });
    Promise.all([findOne, destroy])
      .then(result => {
        res.status(200).json(result[0]);
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  }

  static edit(req, res, next) {
    let ProductId = req.params.id;
    let { name, stock, image_url, price, rating, description } = req.body;
    let numrating = Number(rating)
    Product.update(
      {
        name,
        image_url,
        price,
        stock,
        rating: numrating,
        description
      },
      {
        where: {
          id: ProductId
        },
        returning: true
      }
    )
      // Promise.all([findOne, update])
      .then(result => {
        res.status(200).json(result[1][0]);
      })
      .catch(err => {
        console.log(err, "ini error edit woe");
        next(err);
      });
  }
}

module.exports = ControllerProduct;
// router.post("/", ControllerProduct.add);
// router.get("/", ControllerProduct.findAll);
// router.get("/:id", ControllerProduct.findOne);
// router.delete("/:id", ControllerProduct.destroy);
// router.put("/:id", ControllerProduct.edit);
