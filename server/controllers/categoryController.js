const { Category } = require('../database/models');

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
}

module.exports = CategoryController;