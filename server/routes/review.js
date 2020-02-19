const routes = require("express").Router()
const controlReview = require("../controllers/Review")
const authentication = require("../middlewares/authentication")

routes.post("/:idProduct", authentication, controlReview.createReview)
routes.get("/:idProduct", controlReview.getReviewsByProductId)

module.exports = routes