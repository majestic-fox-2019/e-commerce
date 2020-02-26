const product = require("./productRoute");
const user = require("./userRoute");
const categorie = require("./categorieRoute")
const express = require("express");
const cart = require("./cartRoute")
const router = express.Router();
const authentication = require("../middlewares/authentication");
router.use("/users", user);
router.use("/categorie", categorie)
router.use(authentication);
router.use("/products", product);
router.use("/carts", cart)

module.exports = router;
