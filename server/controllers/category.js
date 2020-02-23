const { Category } = require('../database/models/index')
const createError = require('http-errors')

class CategoryController {
    static getCategories(req, res, next) {
        Category
            .findAll()
            .then(category => {
                if (category.length !== 0) {
                    res.status(200).json(category)
                } else {
                    res.status(200).json({ message: 'No category available yet' })
                }
            })
            .catch(next)
    }
    static postCategory(req, res, next) {
        if (!req.body.name) {
            next(createError(400, 'Category name cannot be empty'))
        } else {
            const value = {
                name: req.body.name
            }
            Category
                .create(value)
                .then(category => {
                    res.status(201).json({data: category, message: 'Successfully add a category'})
                })
                .catch(next)
        }
    }
    static putCategory(req, res, next) {
        const value = {
            name: req.name
        }
        const options = {
            where: { id: req.body.id }
        }
        console.log('Masuk')
        Category
            .update(value, options)
            .then(category => {
                res.status(200).json(category)
            })
            .catch(err => {
                console.log(err)
            })
    }
    static deleteCategory(req, res, next) {
        const options = {
            where: { id: req.body.id }
        }
        console.log('Masuk')
        Category
            .delete(options)
            .then(category => {
                res.status(200).json(category)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

module.exports = CategoryController