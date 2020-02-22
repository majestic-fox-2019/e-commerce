const router = require('express').Router()

const Controller = require('../controllers/banner')

const authenticate = require('../middlewares/authenticate')

const authorize = require('../middlewares/authorize-banner')

router.get('/', Controller.readAll)

router.get('/:id', Controller.readOne)

router.use(authenticate)

router.use(authorize)

router.post('/', Controller.create)

router.delete('/:id', Controller.delete)

module.exports = router
