const { Product, Category } = require("../models");

class ProductController {
  static createProduct(req, res, next) {
    Product.create({
      name: req.body.name,
      image_url: req.body.image_url,
      price: req.body.price,
      stock: req.body.stock,
      CategoryId: req.body.CategoryId
    })
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        if (err.message != 0) {
          err.StatusCode = 400;
        }
        next(err);
      });
  }

  static getProduct(req, res, next) {
    Product.findAll({ include: Category })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        next(err);
      });
  }

  static findOne(req, res, next) {
    Product.findOne({ where: { id: req.params.id } })
      .then(data => {
        if (data) {
          res.status(200).json(data);
        }
      })
      .catch(err => {
        next(err);
      });
  }

  static updateProduct(req, res, next) {
    Product.update(
      {
        name: req.body.name,
        image_url: req.body.image_url,
        price: req.body.price,
        stock: req.body.stock
      },
      {
        where: { id: req.params.id },
        returning: true
      }
    )
      .then(data => {
        console.log(data);
        if (data[0] != 0) {
          res.status(200).json(data[1][0]);
        } else {
          let msg = {
            StatusCode: "404",
            message: "command not found"
          };
          res.status(404).json(msg);
        }
      })
      .catch(err => {
        if (err.message != 0) {
          err.StatusCode = 400;
        }
        next(err);
      });
  }

  static deleteProduct(req, res, next) {
    Product.findOne({ where: { id: req.params.id } })
      .then(data => {
        console.log(data, "<<<<");
        if (data != null) {
          console.log("aaaaa");
          return Product.destroy({ where: { id: req.params.id } });
        } else {
          let msg = {
            StatusCode: "404",
            message: "command not found"
          };
          res.status(404).json(msg);
        }
      })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = ProductController;
