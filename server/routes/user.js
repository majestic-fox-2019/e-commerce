const user = require('express').Router()
const controller = require('../controllers/user')
const auth = require('../middlewares/authToken')

user
    .post('/', controller.postUser)
    .get('/', controller.getUsers)
    .put('/', controller.putUser)
    .delete('/:id')

module.exports = user