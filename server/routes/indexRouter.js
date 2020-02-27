require("dotenv").config();
const express = require("express");
const router = express.Router();
const routerUser = require("./routerUser");
const routerProduct = require("./routerProducts");
const routerCart = require('./routerCart')
const routerCheckout = require('./routerCheckout')
const authentication = require("../middlewares/authentication");
const errorHandling = require("../middlewares/error_handling");


router.use("/", routerUser);
router.use(authentication);
router.use("/products", routerProduct);
router.use("/carts", routerCart);
router.use("/checkout", routerCheckout)

router.use(errorHandling);

module.exports = router;
