const express = require('express');
const router = express.Router();
const Controller = require("../controllers/product");
const authentication = require('../middlewares/authentication')
// const authorized = require('../middlewares/authorized')
router.get('/', Controller.findAll)
router.get('/:id', Controller.findOne)
router.use(authentication)
router.post('/', Controller.create)
router.put('/:id',  Controller.update)
router.delete('/:id', Controller.destroy)

module.exports = router
