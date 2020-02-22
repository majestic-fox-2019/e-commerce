var express = require('express')
var router = express.Router()
const categoryController = require('../controllers/categories')


router.get('/', categoryController.showCategory)
router.post('/', categoryController.addCategory)
router.get('/:id', categoryController.showOneCategory)
router.put('/:id', categoryController.updateCategory)
router.delete('/:id', categoryController.deleteCategory)

module.exports = router