const categoryRouter = require('express').Router()
const categoryController = require('../controller/categoryController')
const authorization = require('../middlewares/authorization')

categoryRouter.get('/listCategory',authorization,categoryController.list)
categoryRouter.post('/addCategory',authorization,categoryController.addCategory)
categoryRouter.delete('/deleteCategory/:id',authorization,categoryController.deleteCategory)
categoryRouter.put('/updateCategory/:id',authorization,categoryController.updateCategory)


module.exports = categoryRouter