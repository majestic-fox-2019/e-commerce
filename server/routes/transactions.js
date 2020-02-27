const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { authentication, isCustomer } = require('../middlewares/auth');

router.use(authentication, isCustomer);
// router.post("/", transactionController.addTransaction);

module.exports = router;