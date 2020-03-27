const { Cart, Product, User } = require("../models");

class CartController {
  static createCart(req, res, next) {
    Cart.create({
      total: req.body.total,
      ProductId: req.body.ProductId,
      UserId: req.user.id
    })
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        if (err.message != 0) {
          err.StatusCode = 400;
          res.status(err.StatusCode).json({ message: err.message });
        } else {
          res.status(500).json(err);
        }
      });
  }

  static getCart(req, res, next) {
    Cart.findAll({ where: { UserId: req.user.id } })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        next(err);
      });
  }

  // static findOne(req, res, next) {
  //   Cart.findOne({ where: { id: req.params.id } })
  //     .then(data => {
  //       if (data) {
  //         res.status(200).json(data);
  //       }
  //     })
  //     .catch(err => {
  //       next(err);
  //     });
  // }

  static updateCart(req, res, next) {
    Cart.update(
      {
        total: req.body.total,
        UserId: req.user.id,
        ProductId: req.body.ProductId
      },
      {
        where: { UserId: req.user.id, ProductId: req.body.ProductId },
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

  static deleteCart(req, res, next) {
    Cart.findOne({
      where: { UserId: req.user.id, ProductId: req.params.id }
    })
      .then(data => {
        console.log("masuk");
        if (data != null) {
          return Cart.destroy({
            where: { UserId: req.user.id, ProductId: req.params.id }
          });
        } else {
          let msg = {
            StatusCode: "404",
            message: "command not found"
          };
          res.status(404).json(msg);
        }
      })
      .then(data => {
        res.status(200).json({ message: "data has been deleted" });
      })
      .catch(err => {
        next(err);
      });
  }

  static checkout(req, res, next) {
    let cart = req.body.cart;
    let flag = true;
    let errMsg = "";
    let arr = [];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].stock < cart[i].Cart.total) {
        errMsg += `stock ${cart[i].name} is not enough , `;
        flag = false;
      }
    }
    if (!flag) {
      res.status(400).json(errMsg);
    } else {
      for (let i = 0; i < cart.length; i++) {
        let stock = cart[i].stock - cart[i].Cart.total;
        let tmp = Product.update(
          { stock: stock },
          { where: { id: cart[i].id } }
        );
        let tmp2 = Cart.destroy({
          where: { UserId: req.user.id, ProductId: cart[i].id }
        });
        arr.push(tmp);
        arr.push(tmp2);
      }
      Promise.all(arr)
        .then(values => {
          res.status(200).json({ message: "checkout success" });
        })
        .catch(err => {
          res.status(400).json({ message: "error checkout" });
        });
    }
  }
}

module.exports = CartController;
