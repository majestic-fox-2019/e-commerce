const categoryRoute = require('express').Router()

const authentication = require('../middlewares/authentication')
const categoryController = require('../controllers/categoryController')

categoryRoute.get('/', categoryController.showAll)
categoryRoute.post('/', authentication, categoryController.addCategory)
categoryRoute.delete('/:id', authentication, categoryController.deleteCategory)
categoryRoute.put('/:id', authentication, categoryController.editCategory)


module.exports = categoryRoute