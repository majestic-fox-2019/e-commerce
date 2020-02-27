const { Category, Product } = require('../database/models');

class CategoryController {
  // show all category
  static async showAllCategory(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.status(200);
      res.json(categories);
    } catch (err) {
      next(err);
    }
  }
  // show product by category
  static async showCategorizedProduct(req, res, next) {
    const { id } = req.params;
    try {
      const prodCat = Category.findOne({
        where: {
          id
        },
        include: [Product]
      });
      res.status(200);
      res.json(prodCat);
    } catch (err) {
      next(err);
    }
  }
  // create a category
  static async createCategory(req, res, next) {
    const { name } = req.body;
    try {
      const category = await Category.create({
        name
      });
      res.status(201);
      res.json(category);
    } catch (err) {
      next(err);
    }
  }
  // delete a category
  static async deleteCategory(req, res, next) {
    const { id } = req.params;
    try {
      const deletedCategory = Category.destroy({
        where: {
          id
        }
      });
      if (!deletedCategory) {
        next(304);
      }
      else {
        res.status(200);
        res.json({
          message: "Successfully deleted"
        })
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoryController;