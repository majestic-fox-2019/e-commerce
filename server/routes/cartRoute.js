const Cart = require("../controller/cart");
var express = require("express");
var router = express.Router();
router.get("/", Cart.getAll);
router.post("/:id", Cart.addOne);
router.put("/:id", Cart.updateOne);
router.delete("/checkout", Cart.checkout);
router.delete("/:id", Cart.deleteOne);
module.exports = router