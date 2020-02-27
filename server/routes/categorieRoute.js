const Categorie = require("../controller/categorie");
var express = require("express");
var router = express.Router();
router.get("/", Categorie.getAll);
router.post("/", Categorie.addOne);
router.put("/:id", Categorie.updateOne);
router.delete("/:id", Categorie.deleteOne);
module.exports = router;
