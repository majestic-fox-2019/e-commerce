const Product = require("../controller/product");
var express = require("express");
var router = express.Router();
const authentication = require("../middlewares/authentication");
router.get("/", Product.getAll);
router.use(authentication);
router.post("/", Product.addOne);
router.get("/:id", Product.findOne)
router.get("/category/:id", Product.getAllWithCategoryId)
router.put("/:id", Product.updateOne);
router.delete("/:id", Product.deleteOne);

module.exports = router;
