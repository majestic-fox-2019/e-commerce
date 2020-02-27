const category = require('express').Router()
const controller = require('../controllers/category')
const auth = require('../middlewares/authToken')

category
    .get('/', controller.getCategories)
    .use(auth)
    .post('/', controller.postCategory)
    .put('/:id', controller.putCategory)
    .delete('/:id', controller.deleteCategory)

module.exports = category