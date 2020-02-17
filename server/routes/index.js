const product = require("./productRoute");
const user = require("./userRoute");
const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
router.use("/users", user);
router.use(authentication);
router.use("/products", product);

module.exports = router;
