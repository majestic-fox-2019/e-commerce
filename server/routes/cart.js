"use strict"

const router = require('express').Router()
const cartController = require('../controllers/Cart')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.post('/', cartController.addCart)
router.put('/:id', cartController.findCart)
router.delete('/:id', cartController.removeCart)

module.exports = router