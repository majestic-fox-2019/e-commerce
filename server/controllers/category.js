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
        const value = {
            name: req.body.name
        }
        Category
            .create(value)
            .then(category => {
                res.status(201).json({ data: category, message: 'Successfully add a category' })
            })
            .catch(next)
    }
    static putCategory(req, res, next) {
        const value = {
            name: req.body.name
        }
        const options = {
            where: { id: req.params.id },
            returning : true
        }
        Category
            .update(value, options)
            .then(result => {
                if (result[0] != 0) {
                    res.status(200).json({message: 'Successfully updated category'})
                } 
                else {
                    next(createError(404, 'Category not found'))
                }
            })
            .catch(next)
    }
    static deleteCategory(req, res, next) {
        const options = {
            where: { id: req.body.id }
        }
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