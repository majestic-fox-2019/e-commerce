const user = require('express').Router()
const controller = require('../controllers/user')

user
    .get('/', controller.getUsers)
    .post('/', controller.postUser)
    .put('/:id')
    .delete('/:id')

module.exports = user