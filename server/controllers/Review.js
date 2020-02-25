const Review = require("../models").Review
const Product = require("../models").Product
const User = require("../models").User
const Cart = require("../models").Cart
class ControlReview {
    static createReview(req, res, next) {

        if (req.body.rating < 0) {
            throw ({ code: 400, message: "Rating should not be below 0" })
        } else if (req.body.rating > 5) {
            throw ({ code: 400, message: "Rating should not exceed 5" })
        }
        var accumulatedRating
        let reviewJadi
        Product.findOne({ where: { id: req.params.idProduct } })

            .then(ketemu => {
                if (ketemu.UserId == req.payload.id) {
                    throw ({ code: 400, message: "You can not review your own product" })
                } else {
                    return Cart.findOne({ where: { UserId: req.payload.id, ProductId: req.params.idProduct, status: "paid" } })
                }
            })
            .then(cartFound => {
                Review.create({
                    ProductId: req.params.idProduct,
                    UserId: req.payload.id,
                    review: req.body.review,
                    rating: req.body.rating
                })

            })
            .then((reviewCreated) => {
                reviewCreated
                return Review.findAll({ where: { ProductId: req.params.idProduct } })
            })
            .then(semuaReview => {

                let totalRating = 0
                if (semuaReview.length == 0) {
                    totalRating = req.body.rating
                    accumulatedRating = Number(req.body.rating)

                } else {
                    for (let i of semuaReview) {
                        totalRating += i.rating
                    }
                    totalRating += Number(req.body.rating)
                    // console.log(typeof totalRating, "<< type of totalRating")
                    // console.log(totalRating, "<<< ini total ratingnya")
                    accumulatedRating = Math.floor(totalRating / (semuaReview.length + 1))
                }
                // console.log(accumulatedRating, "<<<<< ini accumulated ratingnya")

                return Product.update({ rating: accumulatedRating }, { where: { id: req.params.idProduct }, returning: true })
            })
            .then(ratingProductUpdated => {
                // console.log(ratingProductUpdated[1], "<<<<< ini rating produc")
                res.status(201).json({ reviewCreated: reviewJadi, ratingProductLast: ratingProductUpdated })
            })
            .catch(err => {
                next(err)
                // console.log(err, "<<< ini")
                // next({ code: 400, message: "You havent purchased this product, you can not review" })
            })
    }

    static getReviewsByProductId(req, res, next) {
        let accumulatedPR
        Product.findOne({ where: { id: req.params.idProduct } })
            .then(iniProductnya => {
                accumulatedPR = iniProductnya
                return Review.findAll({ where: { ProductId: req.params.idProduct }, include: [User, Product] })
            })
            .then(allReviewsOfProduct => {
                res.status(200).json({ allReviewsOfProduct, accumulatedPR })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ControlReview