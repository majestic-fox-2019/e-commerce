const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authentication, isAdmin } = require('../middlewares/auth');

router.get("/", productController.showAllProduct);
router.get("/:id", productController.showOneProduct);
router.post("/", authentication, isAdmin, productController.createProduct);
router.delete("/:id", authentication, isAdmin, productController.deleteProduct);

/* GET users listing. */
router.get('/*', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
