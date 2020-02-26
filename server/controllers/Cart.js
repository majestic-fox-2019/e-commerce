const Cart = require("../models").Cart
const Product = require("../models").Product
const User = require("../models").User
const axios = require("axios")
class ControlCart {
    static addToCart(req, res, next) {
        if (req.body.qty < 0) {
            throw ({ code: 400, message: "quantity should not be below 0" })
        }
        let productWanted
        Product.findOne({
            where: { id: req.params.idProduct }
        })
            .then(productFound => {
                productWanted = productFound
                if (productFound.UserId == req.payload.id) {
                    throw ({ code: 400, message: "You can't buy your own product" })
                }
                else if (productFound.stock < req.body.qty) {
                    throw ({ code: 400, message: "Stock is not enough" })
                } else {

                    return Cart.findOne({ where: { UserId: req.payload.id, ProductId: req.params.idProduct, status: "unpaid" } })


                }

            })
            .then(alreadyShopped => {
                let stokAdded
                let sumPrice
                if (alreadyShopped) {
                    stokAdded = alreadyShopped.qty + Number(req.body.qty)
                    sumPrice = stokAdded * productWanted.price
                    return Cart.update({
                        status: "unpaid",
                        ProductId: req.params.idProduct,
                        UserId: req.payload.id,
                        qty: stokAdded,
                        totalPrice: sumPrice
                    }, { where: { UserId: req.payload.id, ProductId: req.params.idProduct }, returning: true })
                } else {
                    stokAdded = Number(req.body.qty)
                    sumPrice = stokAdded * productWanted.price
                    return Cart.create({
                        status: "unpaid",
                        ProductId: req.params.idProduct,
                        UserId: req.payload.id,
                        qty: stokAdded,
                        totalPrice: sumPrice
                    })

                }
            })
            .then(cartCreated => {
                res.status(201).json({ cartCreated, productWanted })
            })
            .catch(err => {
                next(err)
            })
    }

    static myCarts(req, res, next) {
        Cart.findAll({ where: { UserId: req.payload.id, status: "unpaid" }, include: [Product, User], order: [['createdAt', 'ASC']] })
            .then(milikku => {
                res.status(200).json(milikku)
            })
            .catch(err => {
                next(err)
            })
    }

    static updateCart(req, res, next) {
        if (req.body.qty < 0) {
            throw ({ code: 400, message: "quantity should not be lower than 0" })
        }
        let sumPrice
        let productNya
        Product.findOne({ where: { id: req.params.idProduct } })
            .then(productAda => {
                productNya = productAda
                sumPrice = req.body.qty * productAda.price
                return Cart.update({ totalPrice: sumPrice, qty: req.body.qty }, { where: { ProductId: req.params.idProduct, UserId: req.params.idUser, status: req.params.status }, returning: true })

            })
            .then(cartUpdated => {

                res.status(200).json({ cartUpdated, productNya })
            })
            .catch(err => {
                console.log(err, "<< error update cart")
                next(err)
            })
    }
    static deleteCart(req, res, next) {
        Cart.destroy({ where: { ProductId: req.params.idProduct, UserId: req.params.idUser, status: req.params.status } })
            .then(() => {
                res.status(200).json({ message: "cart deleted" })
            })
            .catch(err => {
                next(err)
            })
    }

    static checkoutCart(req, res, next) {
        let semuaPunyaku = []
        let toBeCheckedOut = []
        let checkedOut
        Cart.findAll({ where: { UserId: req.payload.id, status: "unpaid" }, include: [Product, User] })
            .then(milikku => {
                for (let i of milikku) {
                    Product.findOne({ where: { id: i.ProductId } })
                        .then(ketemu => {

                            if (ketemu.stock < i.qty) {
                                throw ({ code: 400, message: "Stock is not enough" })
                            }
                        })
                }
                for (let j of milikku) {
                    semuaPunyaku.push(j)
                    toBeCheckedOut.push(Cart.update({ status: "paid" }, { where: { ProductId: j.ProductId, UserId: req.payload.id }, returning: true }))

                }
                return Promise.all(toBeCheckedOut)
            })
            .then(mauDiChecout => {
                // console.log(mauDiChecout[0][1], "<<<<<<<")
                checkedOut = mauDiChecout
                let mauUpdateStock = []
                for (let k of mauDiChecout) {
                    console.log(k[1][0].ProductId, "IKI ID<<<<<<<<<")
                    mauUpdateStock.push(Product.findOne({ where: { id: k[1][0].ProductId } }))
                }
                // res.status(200).json(mauDiChecout)
                return Promise.all(mauUpdateStock)
            })
            .then(barangsFound => {
                // console.log(barangsFound, " IKI BARANGS FOUND<<<<<<<<<<<<<<,")
                let updateStockProduct = []
                for (let l of barangsFound) {
                    for (let m of semuaPunyaku) {
                        let qtyCheckedOut = m.qty
                        let stockAwal = l.stock
                        let stockAkhir = stockAwal - qtyCheckedOut
                        if (l.id == m.ProductId) {
                            updateStockProduct.push(Product.update({ stock: stockAkhir }, { where: { id: m.ProductId }, returning: true }))
                        }
                    }
                }
                return Promise.all(updateStockProduct)
            })
            .then(sudahTerupdate => {
                res.status(200).json({ sudahTerupdate, checkedOut })
            })
            .catch(err => {
                next(err)
            })
    }
    static getTransactionHistory(req, res, next) {
        Cart.findAll({ where: { UserId: req.payload.id, status: "paid" }, include: [Product] })
            .then(allPaid => {
                res.status(200).json(allPaid)
            })
            .catch(err => {
                next(err)
            })
    }

    static getAllTransactionOfMyShop(req, res, next) {
        Cart.findAll({ where: { status: "paid" }, include: [Product, User] })
            .then(allYangPaid => {
                // res.status(200).json(allYangPaid)
                let transOfMyShop = []
                for (let i of allYangPaid) {
                    if (i.Product.UserId == req.payload.id) {
                        transOfMyShop.push(i)
                    }
                }
                res.status(200).json(transOfMyShop)
            })
            .catch(err => {
                next(err)
            })
    }
    static getAllTransactionOfAllShop(req, res, next) {
        Cart.findAll({ where: { status: "paid" }, include: [Product, User] })
            .then(alTransOfAllShop => {
                res.status(200).json(alTransOfAllShop)
            })
            .catch(err => {
                next(err)
            })
    }

    static getCartYangPaidOfThisProductDanUserIdnyaAku(req, res, next) {
        Cart.findOne({ where: { ProductId: req.params.idProduct, UserId: req.payload.id, status: "paid" } })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static getOngkir(req, res, next) {
        axios({
            method: "POST",
            url: "https://api.rajaongkir.com/starter/cost",
            headers: {
                key: process.env.APIKEYRAJAONGKIR
            },
            data: {
                origin: "501",
                destination: req.body.destination,
                weight: 1,
                courier: "jne"
            }
        })
            .then(result => {
                // console.log(result.data.rajaongkir.results[0].costs[0].cost[0].value, "<< ini result")
                res.status(200).json(result.data.rajaongkir.results[0].costs[0].cost[0].value)
            })
            .catch(err => {
                // console.log(err, "<< ini error");
                next(err)
            });
    }

}

module.exports = ControlCart