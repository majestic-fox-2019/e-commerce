const router = require('express').Router()

const Controller = require('../controllers/transaction')

const authenticate = require('../middlewares/authenticate')

router.use(authenticate)

router.get('/', Controller.readAll)

// router.delete('/', Controller.delete)

module.exports = router
