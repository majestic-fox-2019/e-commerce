const indexRouter = require('express').Router()
const userController = require('../controllers/user')
const productController = require('../controllers/product')
const productRouter = require('./product')
const cartRouter = require('./cart')
const authentication = require('../middlewares/authentication')

indexRouter.post('/login', userController.login)
indexRouter.post('/register', userController.register)
indexRouter.get('/products', productController.list)
indexRouter.get('/products/:id', productController.getById)
indexRouter.use(authentication)
indexRouter.use('/carts', cartRouter)
indexRouter.use('/products',productRouter)

module.exports = indexRouter