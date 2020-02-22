const { Category, Product } = require('../models')

class CategoryController {
  static addCategory(req, res, next) {
    let { name } = req.body
    Category
      .create({
        name
      })
      .then(category => {
        res.status(201).json(category);
      })
      .catch(err => {
        next(err)
      })
  }

  static showCategory(req, res, next) {
    Category
      .findAll()
      .then(category => {
        res.status(200).json(category)
      })
      .catch(err => {
        next(err)
      })
  }

  static showOneCategory(req, res, next) {
    let id = req.params.id
    Category
      .findOne({
        where: {
          id: id
        },
        include: Product
      })
      .then(category => {
        res.status(200).json(category)
      })
      .catch(err => {
        next(err)
      })
  }

  static updateCategory(req, res, next) {
    let category = {
      name: req.body.name
    }
    let id = req.params.id

    Category
      .update(category, {
        where: {
          id: id
        },
        returning: true
      })
      .then(category => {
        res.status(200).json(category)
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteCategory(req, res, next) {
    let deleted = {}
    let id = req.params.id

    Category
      .findByPk(id)
      .then(category => {
        deleted = category
        return Category
          .destroy({
            where: {
              id: id
            }
          })
      })
      .then(category => {
        res.status(200).json(deleted)
      })
      .catch(err => {
        next(err)
      })

  }
}

module.exports = CategoryController