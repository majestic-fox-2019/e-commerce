const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authentication, isCustomer } = require('../middlewares/auth');

router.use(authentication, isCustomer)
router.get("/", cartController.getMyCart)
router.post("/", cartController.addToCart);
router.put("/:id", cartController.editCart);
router.delete("/:ProductId", cartController.deleteFromCart);

module.exports = router;
