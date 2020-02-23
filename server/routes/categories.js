const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authentication, isAdmin } = require('../middlewares/auth');

router.get("/", categoryController.showAllCategory);
router.post("/", authentication, isAdmin, categoryController.createCategory);

/* GET users listing. */
router.get('/*', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
