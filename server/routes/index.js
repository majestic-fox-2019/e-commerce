const product = require("./productRoute");
const user = require("./userRoute");
const categorie = require("./categorieRoute")
const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
router.use("/users", user);
router.use(authentication);
router.use("/categorie", categorie)
router.use("/products", product);

module.exports = router;
