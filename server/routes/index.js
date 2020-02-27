const express = require("express");
const router = express.Router();
const product = require("./product");
const category = require("./category");
const user = require("./user");
const cart = require("./cart");

router.use("/user", user);
router.use("/products", product);
router.use("/category", category);
router.use("/cart", cart);

module.exports = router;
