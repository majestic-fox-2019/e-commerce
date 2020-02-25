const express = require('express');
const router  = express.Router();

const TransactionControllers = require('../controllers/TransactionController');

router.post('/', TransactionControllers.addToCart);

module.exports = router;