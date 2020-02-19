const routes = require("express").Router()
const controlProduct = require("../controllers/Product")
const authentication = require("../middlewares/authentication")
const { toEditDeleteProduct } = require("../middlewares/authorization")
const upload = require("../middlewares/awsUpload")

routes.get("/", controlProduct.getAllProducts)
routes.post("/", authentication, upload.single("image_url"), controlProduct.postProduct)
routes.get("/mine", authentication, controlProduct.myProducts)
routes.put("/:idProduct", authentication, toEditDeleteProduct, controlProduct.editProduct)
routes.delete("/:idProduct", authentication, toEditDeleteProduct, controlProduct.deleteProduct)
routes.get("/:idProduct", controlProduct.getDetailById)
routes.get("/category/:category", controlProduct.getProductsByCategory)
module.exports = routes