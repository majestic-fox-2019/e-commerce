const index = require('express').Router()
const user = require('./user')
const userController = require('../controllers/user')
const category = require('./category')
const product = require('./product')
const auth = require('../middlewares/authToken')

index
    .post('/login', userController.login)
    .use('/users', user)
    .use(auth)
    .use('/categories', category)
    .use('/products', product)

module.exports = index