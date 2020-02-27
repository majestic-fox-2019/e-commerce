const createError = require('http-errors');
const { Product, ProductCategory, Category } = require('../database/models');

class ProductController {
  // show all products
  static async showAllProduct(req, res, next) {
    try {
      const products = await Product.findAll({
        include: [Category],
        order: [["id"]]
      });
      // then
      res.status(200);
      res.json(products);
    } catch (err) {
      next(err);
    }
  }
  // find one product
  static async showOneProduct(req, res, next) {
    const { id } = req.params;
    try {
      const foundProduct = await Product.findOne({
        where: {
          id
        },
        include: [Category]
      });
      if (!foundProduct) {
        next(createError(404));
      }
      else {
        res.status(200);
        res.json(foundProduct);
      }
    }
    catch (err) {
      next(err);
    }
  }
  // create a product
  static async createProduct(req, res, next) {
    const { name, image_url, price, stock, categories } = req.body;
    try {
      // create product
      const product = await Product.create({
        name, image_url, price, stock
      });
      const { id: ProductId } = product;
      if (categories && categories instanceof Array) {
        // associate it
        const records = []
        for (const CategoryId of categories) {
          records.push({
            ProductId, CategoryId
          })
        }
        console.log(records);
        await ProductCategory.bulkCreate(records);
      }
      // find again
      const foundProduct = await Product.findOne({
        where: {
          id: ProductId
        },
        include: [Category]
      })
      res.status(201);
      res.json(foundProduct);
    } catch (err) {
      next(err);
    }
  }
  // delete a product
  static async deleteProduct(req, res, next) {
    const { id } = req.params;
    try {
      const foundProduct = await Product.findOne({
        where: {
          id
        }
      });
      if (!foundProduct) {
        next(createError(304));
      }
      else {
        ProductCategory.destroy({
          where: {
            ProductId: id
          }
        })
        await Product.destroy({
          where: {
            id
          }
        });
        res.status(200);
        res.json({
          message: "Successfully deleted",
          product: foundProduct
        })
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductController;