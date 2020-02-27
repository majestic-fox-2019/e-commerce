const {Product, Category} = require('../models')
const createError = require('http-errors')

class Controller{
    static findAll(req, res, next){
        Product
        .findAll({
            include: [Category]
        })
        .then(data =>{
            if (data.length > 0) {
                res.status(200).json(data)
            } else {
                throw createError(404, 'Data Not Found')
            }
        })
        .catch(err =>{
            next(err)
        })
    }
    static findOne(req, res, next){
        const {id} = req.params
        Product
        .findOne({
            include: [Category],
            where:{id:id}
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
    static create(req, res, next){
        const { name, image_url, price, stock, CategoryId, description } = req.body
        Product
        .create({ 
            name, 
            image_url, 
            price, 
            stock, 
            description,
            CategoryId
        })
        .then(data =>{
            res.status(201).json(data)
        })
        .catch(err =>{
            next(err)
        })
    }
    static update(req, res, next){
        const {id} = req.params
        const {name, image_url, price, stock } = req.body
        Product
        .update({
            name, 
            image_url, 
            price, 
            stock,
            description,
            CategoryId
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
        const findOne = Product.findOne({where:{id:id}})
        const destroy = Product.destroy({ where:{id:id}})
        Promise.all([findOne, destroy])
        .then(data =>{
            res.status(200).json(data[0])
        })
        .catch(err =>{
            next(err)
        })
    }
}

module.exports = Controller