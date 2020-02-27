const express = require('express')
const router  = express.Router()
const CategoryController = require('../controllers/CategoryController')
const middleware = require('../middlewares/middleware')

router.get('/admin/categories', middleware.verifyToken, middleware.allAdmin, CategoryController.getListCategory)
router.post('/admin/category', middleware.verifyToken, middleware.allAdmin, CategoryController.createCategory)
router.get('/admin/category/:id', middleware.verifyToken, middleware.allAdmin, CategoryController.getDetailCategory)
router.put('/admin/category/:id', middleware.verifyToken, middleware.allAdmin, CategoryController.updateCategory)
router.delete('/admin/category/:id', middleware.verifyToken, middleware.allAdmin, CategoryController.deleteCategory)

router.get('/categories', CategoryController.getListCategory)

module.exports = router