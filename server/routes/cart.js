const routes = require("express").Router()
const controlCart = require("../controllers/Cart")
const authentication = require("../middlewares/authentication")
const { toEditDeleteCart, forAdmin } = require("../middlewares/authorization")

routes.post("/:idProduct", authentication, controlCart.addToCart)
routes.get("/mine", authentication, controlCart.myCarts)
routes.patch("/:idProduct/:idUser/:status", authentication, toEditDeleteCart, controlCart.updateCart)
routes.delete("/:idProduct/:idUser/:status", authentication, toEditDeleteCart, controlCart.deleteCart)
routes.patch("/checkout", authentication, controlCart.checkoutCart)
routes.get("/history", authentication, controlCart.getTransactionHistory)
routes.get("/history/myShop", authentication, controlCart.getAllTransactionOfMyShop)
routes.get("/history/all", authentication, forAdmin, controlCart.getAllTransactionOfAllShop)
routes.get("/have/ibought/:idProduct", authentication, controlCart.getCartYangPaidOfThisProductDanUserIdnyaAku)
routes.post("/ongkir/berapa", controlCart.getOngkir)
module.exports = routes

