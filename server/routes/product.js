const router = require('express').Router()

const Controller = require('../controllers/product')

const authenticate = require('../middlewares/authenticate')

const { checkProduct, authorize } = require('../middlewares/authorize-product')

router.get('/', Controller.readAll)

router.get('/:id', Controller.readOne)

router.use(authenticate)

router.post('/', Controller.create)

router.use('/:id', checkProduct, authorize)

router.put('/:id', Controller.update)

router.delete('/:id', Controller.delete)

module.exports = router
