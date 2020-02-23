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
  // create a product
  static async createProduct(req, res, next) {
    const { name, image_url, price, stock, categories } = req.body;
    try {
      // create product
      const product = await Product.create({
        name, image_url, price, stock
      });
      const { id: ProductId } = product;
      if (categories) {
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
  static deleteProduct(req, res, next) {
    process
  }
}

module.exports = ProductController;