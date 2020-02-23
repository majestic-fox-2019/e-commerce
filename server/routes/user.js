const user = require('express').Router()
const controller = require('../controllers/user')
const auth = require('../middlewares/authToken')

user
    .post('/', controller.postUser)
    .get('/', /*auth,*/ controller.getUsers)
    .put('/', auth, controller.putUser)
    .delete('/:id')

module.exports = user