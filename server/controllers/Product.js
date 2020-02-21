const Product = require("../models").Product
const User = require("../models").User

class ControlProduct {
    static postProduct(req, res, next) {
        const { name, category, stock, image_url, price, rating, description } = req.body
        console.log(req.body, "<<<<<<<<<<<<<<<<<<<<< ini body post")
        if (stock < 0) {
            throw ({ code: 400, message: "stock should not be below 0" })
        } else if (price < 0) {
            throw ({ code: 400, message: "price should not be below 0" })
        } else if (stock < 0 && price < 0) {
            throw ({ code: 400, message: "price and stock should not be below 0" })
        }
        // console.log("masuk")
        Product.create({
            name,
            category,
            stock,
            image_url,
            price,
            rating,
            description,
            UserId: req.payload.id
        })
            .then(productPosted => {
                res.status(201).json(productPosted)
            })
            .catch(err => {
                next(err)
            })
    }

    static getAllProducts(req, res, next) {
        // console.log("MASUK GET ALL PRODUCT")
        Product.findAll({ include: [User] })
            .then(allProducts => {
                res.status(200).json(allProducts)
            })
            .catch(err => {
                next(err)
            })
    }

    static myProducts(req, res, next) {
        Product.findAll({ where: { UserId: req.payload.id } })
            .then(produkKu => {
                res.status(200).json(produkKu)
            })
            .catch(err => {
                next(err)
            })
    }

    static editProduct(req, res, next) {
        // console.log(req.body, "<<<<<")
        const { name, category, stock, image_url, price, description } = req.body
        let catInput
        if (category == "Clothes") {
            catInput == "Clothing"
        } else {
            catInput = category
        }
        let awal
        Product.findOne({ where: { id: req.params.idProduct } })
            .then(productFound => {
                awal = productFound
                let ratingNya = awal.rating
                return Product.update({ name, catInput, stock, image_url, price, description, UserId: req.payload.id, ratingNya },
                    { where: { id: req.params.idProduct }, returning: true, plain: false })
            })
            .then(productUpdated => {
                res.status(200).json(productUpdated)
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteProduct(req, res, next) {
        let yangDidelete
        Product.findOne({ where: { id: req.params.idProduct } })
            .then(productKetemu => {
                yangDidelete = productKetemu
                return Product.destroy({ where: { id: productKetemu.id } })
            })
            .then(() => {
                res.status(200).json({ terhapus: yangDidelete })
            })
            .catch(err => {
                next(err)
            })
    }
    static getDetailById(req, res, next) {
        Product.findOne({ where: { id: req.params.idProduct }, include: [User] })
            .then(detailProduct => {
                res.status(200).json(detailProduct)
            })
            .catch(err => {
                next(err)
            })
    }
    static getProductsByCategory(req, res, next) {
        Product.findAll({ where: { category: req.params.category }, include: [User] })
            .then(perCategory => {
                res.status(200).json(perCategory)
            })
            .catch(err => {
                console.log(err, "<< ini errornya")
                next(err)
            })
    }
}

module.exports = ControlProduct