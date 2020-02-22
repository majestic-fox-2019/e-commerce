const { Category } = require('../database/models/index')

class CategoryController {
    static getCategories(req, res, next) {
        console.log('Masuk')
        Category
            .findAll()
            .then(category => {
                if (category.length !== 0) {
                    res.status(200).json(category)
                } else {
                    res.status(200).json({message: 'No category available yet'})
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    static postCategory(req, res, next) {
        const value = {
            name: req.body.name
        }
        console.log('Masuk')
        Category
            .create(value)
            .then(category => {
                res.status(200).json(category)
            })
            .catch(err => {
                console.log(err)
            })
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