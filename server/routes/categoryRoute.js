const categoryRoute = require('express').Router()

const categoryController = require('../controllers/categoryController')

categoryRoute.get('/', categoryController.showAll)
categoryRoute.post('/', categoryController.addCategory)
categoryRoute.delete('/:id', categoryController.deleteCategory)
categoryRoute.put('/:id', categoryController.editCategory)


module.exports = categoryRoute