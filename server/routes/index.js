const routes = require('express').Router()
const productController = require('../controllers/product')
const userController = require('../controllers/user')
const authentication = require('../middlewares/authentication')
const {authorisationRole, authorisationProduct} = require('../middlewares/authorisation')


routes.post('/register', userController.register)
routes.post('/login', userController.login)


routes.get('/home', productController.showProducts) // show all product
routes.use(authentication)
routes.use(authorisationRole)
routes.post('/admin', productController.createProduct)
routes.delete('/admin/:id', productController.deleteProduct)
routes.put('/admin/:id', productController.updateProduct)

routes.use(authorisationProduct)
routes.get('/products/:id', productController.detailProduct)
routes.post('/products/:id', productController.addToCart)


module.exports = routes