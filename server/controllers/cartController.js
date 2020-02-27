const db = require('../models');

class CartController{
    static findAll(req,res,next){
        db.Cart.findAll({
            include : [
                {
                    model : db.User,
                    attributes : ['email', 'id']
                },
                {
                    model : db.Product
                }
            ],
            where : {
                UserId : req.user.id,
                checked : 0
            }
        })
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
        })
    }

    static findOne(req,res,next){
        db.Cart.findByPk(req.params.id, {
            include : [
                {
                    model : db.User,
                    attributes : ['email', 'id']
                },
                {
                    model : db.Product
                }
            ],
        })
        .then(resp => {
            if(resp){
                res.status(200).json(resp)
            } else {
                next('cart-not-found')
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({msg : 'internal server error'})
        })
    }

    static delete(req,res,next){
        db.Cart.destroy({
            where : {
                id : req.params.id
            }
        })
        .then(response => {
            if(response > 0){
                res.status(200).json({msg:'Cart sucessfully deleted'})
            } else {
                next('product-not-found')
            }
        })
        .catch(err => {
            next(500)
        })
    }

    static create(req,res,next){
        console.log('masuk create cart')
        db.Cart.findOne({
            include : [
                {
                    model : db.User
                },
                {
                    model : db.Product
                }
            ],
            where : {
                UserId : req.user.id,
                ProductId : req.body.ProductId,
                checked : 0
            }
        })
        .then(resp => {
            if(resp){
                db.Cart.update({
                    qty : resp.qty += 1,
                    totalPrice : resp.totalPrice += resp.Product.price
                },{
                    where : {
                        id : resp.id
                    }
                })
                .then(resp => {
                    res.status(200).json({msg : 'Cart updated'})
                })
            } else {
                db.Product.findOne({
                    where : {
                        id : req.body.ProductId
                    }
                })
                .then(resp => {
                    if(!resp){
                        next('product-not-found')
                    } else {
                        db.Cart.create({
                            UserId : req.user.id,
                            ProductId : req.body.ProductId,
                            qty : 1,
                            totalPrice : resp.price,
                            checked : 0
                        })
                        .then(resp => {
                            res.status(200).json(resp)
                        })
                    }
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    // ------------------ TRANSACTIONS  ------------------  //

    static checkout(req,res,next){
        db.Cart.update({
            checked : 1
        },{
            where : {
                id : req.params.id
            }
        })
        .then(response => {
            if(response > 0){
                res.status(200).json({msg:'Cart sucessfully checked out'})
            } else {
                next('cart-not-found')
            }
        })
        .catch(err => {
            next(500)
        })
    }

    static transactions(req,res,next){
        db.Cart.findAll({
            include : [
                {
                    model : db.User,
                    attributes : ['email', 'id']
                },
                {
                    model : db.Product
                }
            ],
            where : {
                UserId : req.user.id,
                checked : 1
            }
        })
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
        })
    }
}
module.exports = CartController