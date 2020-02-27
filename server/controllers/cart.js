const {Transaction, User, Product, Category} = require('../models')
const createError = require('http-errors')

class Controller{
    static findAll(req, res, next) {
        const UserId = req.user
        Transaction
        .findAll({
            include: [Product],
            where: {
                UserId: UserId
            },
        })
        .then(data =>{
            if (data.length > 0) {
                res.status(200).json(data)
            } else {
                throw createError(404, 'Data Not Found')
            }
        })
            .catch(err => {
                console.log(err)
            next(err)
        })
    }
    static findOne(req, res, next) {
        const {id} = req.params
        Transaction
        .findOne({
            include: [Product],
            where: {
                id: id
            },
        })
        .then(data =>{
            if (data) {
                res.status(200).json(data)
            }else{
                throw createError(404, "Data Not Found")
            }
        })
        .catch(err =>{
            next(err)
        })
    }
    static create(req, res, next) {
        const UserId = req.user
        const { ProductId } = req.body         
        console.log(UserId, ProductId)
        Transaction
        .create({ 
            UserId: UserId,
            ProductId: ProductId,
            quantity: 1,
        })
        .then(data =>{
            res.status(201).json(data)
        })
        .catch(err =>{
            next(err)
        })
    }
    static update(req, res, next) {
        const { id } = req.params
        const { quantity } = req.body
        Transaction
        .update({
            quantity: quantity
        }, { 
            where:{id:id},
            returning : true
        })
        .then(data =>{
            res.status(200).json(data[1][0])
        })
        .catch(err =>{
            next(err)
        })
    }
    static destroy(req, res, next){
        const {id} = req.params
        const findOne = Transaction.findOne({where:{id:id}})
        const destroy = Transaction.destroy({ where:{id:id}})
        Promise.all([findOne, destroy])
        .then(data =>{
            res.status(200).json(data[0])
        })
        .catch(err =>{
            next(err)
        })
    }
    static buy(req, res, next) {
        console.log(req.body)
        let data = req.body
        let dataCart = []
        data.forEach(el => {
            let stockResult = el.Product.stock - el.quantity
            if (stockResult < 0) {
                throw createError(404, 'forbidden')
            } else {
                dataCart.push({
                    UserId: el.UserId,
                    ProductId: el.ProductId,
                    stockNow: stockResult
                })
            }
        })
        let objUpdate = []
        dataCart.forEach(item => {
            objUpdate.push(
                Product
                    .update(
                        { stock: item.stockNow },
                        { where: { id: item.ProductId } }
                    ))
        })
        Promise.all(objUpdate)
            .then(result => {
                console.log(result)
                console.log(req.user.id)
                Transaction
                    .destroy({
                        where: {
                            UserId: req.user
                        }
                    })
                    .then(result => {
                        res.status(201).json(result)
                    })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = Controller