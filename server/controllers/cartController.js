const createError = require('http-errors');
const { Cart, Product } = require('../database/models');

class CartController {
  // show all cart
  static async getMyCart(req, res, next) {
    const { id: UserId } = req.headers.user;
    try {
      const foundCarts = await Cart.findAll({
        where: {
          UserId
        },
        include: [Product]
      })
      res.status(200);
      res.json(foundCarts);
    } catch (err) {
      next(err);
    }
  }
  // add to cart
  static async addToCart(req, res, next) {
    const { id: UserId } = req.headers.user;
    const { ProductId, quantity = 1 } = req.body;
    try {
      const foundCart = await Cart.findOne({
        where: {
          UserId,
          ProductId
        }
      })
      // jika cart ditemukan maka jangan add lagi hal yang sama
      if (foundCart) {
        next(createError(403));
      }
      else {
        const createdCart = await Cart.create({
          UserId,
          ProductId,
          quantity
        })
        res.status(200);
        res.json(createdCart);
      }
    } catch (err) {
      next(err);
    }
  }
  // delete from cart
  static async deleteFromCart(req, res, next) {
    const { id: UserId } = req.headers.user;
    const { ProductId } = req.params;
    console.log(UserId, ProductId);
    try {
      const deletedCart = await Cart.destroy({
        where: {
          UserId,
          ProductId
        }
      });
      res.status(200);
      console.log(deletedCart);
      res.json({
        message: "Successfully deleted"
      });
    } catch (err) {
      next(err);
    }
  }
  // edit cart
  static async editCart(req, res, next) {

  }
}

module.exports = CartController;