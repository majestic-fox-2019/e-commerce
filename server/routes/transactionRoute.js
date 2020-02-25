const express = require('express');
const router  = express.Router();

const TransactionControllers = require('../controllers/TransactionController');

router.post('/', TransactionControllers.addToCart);
router.get('/:UserId', TransactionControllers.listTransactionByUser);
router.get('/:UserId/getTotal', TransactionControllers.getTotalByUser);

module.exports = router;