const { Category, Product } = require('../database/models/index')
const createError = require('http-errors')

class CategoryController {
    static getCategories(req, res, next) {
        const options = {
            include: {
                model: Product,
                required: false
            }
        }
        Category
            .findAll(options)
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
                res.status(201).json({ data: category, message: 'Successfully added a category' })
            })
            .catch(next)
    }
    static putCategory(req, res, next) {
        if (req.body.name) {
            const value = {
                name: req.body.name
            }
            const options = {
                where: { id: Number(req.params.id) },
            }
            Category
                .update(value, options)
                .then(result => {
                    if (result[0] != 0) {
                        res.status(200).json({ message: 'Successfully updated category' })
                    }
                    else {
                        next(createError(404, 'Failed update category'))
                    }
                })
                .catch(err => {
                    console.log(err)
                    next(err)
                })
        } else {
            res.status(404).json({message: 'Category name cannot be empty'})
        }
    }
    static deleteCategory(req, res, next) {
        const options = {
            where: { id: Number(req.params.id) }
        }
        Category
            .destroy(options)
            .then(result => {
                if (result !== 0) {
                    res.status(200).json({ message: 'Successfully deleted category' })
                } else {
                    next(createError(404, 'Category not found'))
                }
            })
            .catch(err => {
                console.log('gagal')
                console.log(err)
            })
    }
}

module.exports = CategoryController