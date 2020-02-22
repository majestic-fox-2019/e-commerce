const category = require('express').Router()
const controller = require('../controllers/category')

category
    .get('/', controller.getCategories)
    .post('/', controller.postCategory)
    .put('/:id', controller.putCategory)
    .delete('/:id', controller.deleteCategory)

module.exports = category