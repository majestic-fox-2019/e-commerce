const router = require('express').Router()
const CartController = require('../controllers/CartController')
const { authentication } = require('../middlewares/auth')

router.use(authentication)

router.post('/', CartController.create)
router.get('/', CartController.readAll)
router.patch('/:id', CartController.updateQtyCart)
router.delete('/:id', CartController.deleteOne)
router.delete('/', CartController.deleteMany)
router.post('/checkout', CartController.checkoutCart)

module.exports = router