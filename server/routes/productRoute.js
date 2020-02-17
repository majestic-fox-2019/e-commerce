const Product = require("../controller/product");
var express = require("express");
var router = express.Router();
router.get("/", Product.getAll);
router.post("/", Product.addOne);
router.put("/:id", Product.updateOne);
router.delete("/:id", Product.deleteOne);
module.exports = router;
