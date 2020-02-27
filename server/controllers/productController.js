const Product = require('../models/').Product;
const db = require('../models/');

class productController{
    static create(req,res,next){
        console.log("masuk ke controller create")
        console.log(req.body)
        Product.create({
            name : req.body.name,
            price : Number(req.body.price),
            image_url : req.body.file,
            stock : Number(req.body.stock),
            category : req.body.category
        })
        .then(response =>{
            console.log("added a product")
            res.status(201).json(response)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static findAll(req,res,next){
        Product.findAll()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err)
            next(500)
        })
    }

    static findOne(req,res,next){
        Product.findByPk(req.params.id)
        .then(response => {
            if(!response){
                next(400)
            }
            res.status(200).json(response)
        })
        .catch(err => {
            next(500)
        })
    }

    static edit(req,res,next){
        Product.update({
            name : req.body.name,
            price : req.body.price,
            image_url : req.body.image_url,
            stock : Number(req.body.stock),
            category : req.body.category
        },{
            where : {
                id : req.params.id
            }
        })
        .then(response => {
            if(response > 0){
                res.status(200).json({msg:'Item sucessfully updated'})
            } else {
                next('product-not-found')
            }
        })
        .catch(err => {
            next(err)
        })
    }
    
    static delete(req,res,next){
        Product.destroy({
            where : {
                id : req.params.id
            }
        })
        .then(response => {
            if(response > 0){
                res.status(200).json({msg:'Item sucessfully deleted'})
            } else {
                next('product-not-found')
            }
        })
        .catch(err => {
            next(500)
        })
    }
}

module.exports = productController
