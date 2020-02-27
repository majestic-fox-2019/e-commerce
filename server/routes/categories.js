var express = require('express')
var router = express.Router()
const categoryController = require('../controllers/categories')
const isAdmin = require('../middlewares/isAdmin')
const authentication = require('../middlewares/authentication')

router.get('/', categoryController.showCategory)

router.use(authentication)
router.use(isAdmin)

router.post('/', categoryController.addCategory)
router.get('/:id', categoryController.showOneCategory)
router.put('/:id', categoryController.updateCategory)
router.delete('/:id', categoryController.deleteCategory)

module.exports = router