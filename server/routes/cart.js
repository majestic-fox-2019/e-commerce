const express = require('express');
const router = express.Router();
const Controller = require("../controllers/cart");
const authentication = require('../middlewares/authentication')
// const authorized = require('../middlewares/authorized')
router.use(authentication)
router.get('/', Controller.findAll)
router.post('/', Controller.create)
router.get('/:id', Controller.findOne)
router.patch('/:id',  Controller.update)
router.post('/checkout', Controller.buy)
router.delete('/:id', Controller.destroy)

module.exports = router
