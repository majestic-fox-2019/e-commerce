const { Category, Product } = require('../models')
const createError = require('http-errors')

class CategoryController {
    static showAll(req, res, next) {
        Category
            .findAll({
                order: [['name', 'ASC']]
            })
            .then(list => {
                res.status(200).json(list)
            })
            .catch(next)
    }

    static addCategory(req, res, next) {
        let add = {
            name: req.body.name,
            image: req.body.image
        }

        Category
            .findOne({
                where: {
                    name: add.name
                }
            })
            .then(data => {
                if (data) {
                    throw createError(400, `Category ${add.name} already exist`)
                } else {
                    return Category.create(add)
                }
            })
            .then(added => {
                res.status(201).json(added)
            })
            .catch(next)
    }

    static deleteCategory(req, res, next) {
        let id = req.params.id

        let deletedData = null
        Category
            .findOne({
                where: {
                    id
                },
                include: [Product]
            })
            .then(category => {
                if (!category) {
                    throw createError(404, 'Category not found')
                } else if (category.Products.length > 0) {
                    throw createError(400, `Category ${category.name} still have products included`)
                } else {
                    deletedData = category
                    return category.destroy()
                }
            })
            .then(data => {
                res.status(200).json(deletedData)
            })
            .catch(next)
    }

    static editCategory(req, res, next) {
        let changeCategory = {
            name: req.body.name,
            image: req.body.image
        }

        Category
            .findByPk(req.params.id)
            .then(data => {
                if (!data) {
                    throw createError(404, 'Category not found')
                }
                return data.update(changeCategory)
            })
            .then(category => {
                res.status(200).json(category)
            })
            .catch(next)
    }
}

module.exports = CategoryController