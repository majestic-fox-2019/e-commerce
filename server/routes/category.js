const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const authentication = require("../middleware/authentication");

router.get("/", categoryController.getCategory);
router.use(authentication);
router.post("/", categoryController.createCategory);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
