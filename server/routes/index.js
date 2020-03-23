const routes = require('express').Router()
const userRoute = require("./user")
const productRoute = require("./product")
const reviewRoute = require("./review")
const cartRoute = require("./cart")

routes.use("/users", userRoute)
routes.use("/products", productRoute)
routes.use("/reviews", reviewRoute)
routes.use("/carts", cartRoute)

module.exports = routes