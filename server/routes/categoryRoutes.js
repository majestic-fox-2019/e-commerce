const router = require('express').Router()
const CategoryController = require('../controllers/categoryController')
const isAdmin = require('../middlewares/isAdmin')
const isCategoryExist = require('../middlewares/isCategoryExist')
const authentication = require('../middlewares/authentication')

router.get('/', CategoryController.getAllCategory)
router.use(authentication)
router.use(isAdmin)
router.post('/admin', CategoryController.createCategory)
router.put('/admin/:category_id', isCategoryExist ,CategoryController.updateCategory)
router.delete('/admin/:category_id', isCategoryExist ,CategoryController.deleteCategory)

module.exports = router