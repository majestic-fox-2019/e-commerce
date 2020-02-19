const routes = require("express").Router()
const controlUser = require("../controllers/User")

routes.get("/", controlUser.getAllUser)
routes.post("/register", controlUser.register)
routes.post("/login", controlUser.login)

module.exports = routes