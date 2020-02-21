const routes = require('express').Router()
const productController = require('../controllers/product')
const userController = require('../controllers/user')
const authentication = require('../middlewares/authentication')
const {authorisationRole, authorisationProduct} = require('../middlewares/authorisation')
const unggah = require('../middlewares/unggah')


routes.post('/login', userController.login)
routes.post('/register', userController.register)


routes.get('/home', productController.showProducts)                   // show all product
routes.get('/home/:category', productController.categoriSplit)
routes.get('/products/:id', productController.detailProduct)

routes.use(authentication)                                            // cek token

routes.post('/products/:id', productController.addToCart)

routes.post('/admin-register', authorisationRole, userController.registerAdmin)
routes.post('/admin' ,authorisationRole, unggah.single('image_url'), productController.createProduct)
routes.delete('/admin/:id', authorisationRole, productController.deleteProduct)
routes.put('/admin/:id', authorisationRole, unggah.single('image_url'), productController.updateProduct)

routes.use(authorisationProduct)                                     // cek UserId di product   

routes.delete('/products/:id', productController.removeFrommCart)
routes.put('/products/:id', productController.updateFromCart)
routes.patch('/products/:id', productController.checkOut)



module.exports = routes