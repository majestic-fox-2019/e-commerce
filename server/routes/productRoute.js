const Product = require("../controller/product");
var express = require("express");
var router = express.Router();

router.get("/", Product.getAll);
router.get("/:id", Product.findOne)
router.get("/category/:id", Product.getAllWithCategoryId)
router.post("/", Product.addOne);
router.put("/:id", Product.updateOne);
router.delete("/:id", Product.deleteOne);

module.exports = router;
