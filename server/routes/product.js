const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authentication = require("../middleware/authentication");

router.get("/", productController.getProduct);
router.use(authentication);
router.get("/:id", productController.findOne);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
