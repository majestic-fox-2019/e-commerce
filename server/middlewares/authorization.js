const User = require("../models").User
const Product = require("../models").Product
const Cart = require("../models").Cart

function toEditDeleteProduct(req, res, next) {
    let userYangLogin
    User.findOne({ where: { id: req.payload.id } })
        .then(usernya => {
            userYangLogin = usernya
            return Product.findOne({ where: { id: req.params.idProduct }, include: [User] })

        })
        .then(productFound => {
            // console.log(productFound, "<<<<<<<<<<<<INI DI AUTHORIZATION")
            if (productFound.UserId == req.payload.id || userYangLogin.role == "admin") {
                next()
            } else {
                next({ code: 403, message: "Unauthorized to do this action" })
            }
        })
        .catch(err => {
            next(err)
        })
}

function toEditDeleteCart(req, res, next) {
    Cart.findOne({
        where: { ProductId: req.params.idProduct, UserId: req.params.idUser, status: req.params.status }
    })
        .then(cartFound => {
            if (cartFound) {
                // next()
                if (cartFound.UserId == req.payload.id) {
                    next()
                } else {
                    next({ code: 403, message: "Unauthorized" })
                }
            } else {
                next({ code: 403, message: "Unauthorized" })
            }
        })
        .catch(err => {
            console.log(err, "<<di authorixation")
            next({ code: 403, message: "Unauthorized" })

        })

}

function forAdmin(req, res, next) {
    User.findOne({ where: { id: req.payload.id } })
        .then(userFound => {
            if (userFound.role == "admin") {
                next()
            } else {
                next({ code: 401, message: "Unauthorized" })
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = { toEditDeleteProduct, toEditDeleteCart, forAdmin }