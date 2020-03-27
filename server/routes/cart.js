const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authentication = require("../middleware/authentication");
const userController = require("../controllers/userController");
router.use(authentication);
router.get("/", userController.findUser);
router.post("/", cartController.createCart);
router.put("/", cartController.updateCart);
router.delete("/:id", cartController.deleteCart);
router.put("/checkout", cartController.checkout);

module.exports = router;
