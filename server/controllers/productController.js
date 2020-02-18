const {Product} = require('../models/index')

class ProductController{
    static createProduct(req,res,next){
        Product
        .create({
            name:req.body.name,
            image_url:req.body.image_url,
            price:req.body.price,
            stock:req.body.stock
        })
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            if(err.message != 0){
                err.StatusCode = 400
            }
            next(err)
        })
    }

    static getProduct(req,res,next){
        Product
        .findAll()
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            rnext(err)
        })
    }

    static updateProduct(req,res,next){
        Product
        .update(
            {name:req.body.name,
            image_url:req.body.image_url,
            price:req.body.price,
            stock:req.body.stock
        },
            {
            where: { id: req.params.id},
            returning: true
          })
        .then(data=>{
            res.send(data)
            if(data[0] != 0){
                res.status(200).json(data[1][0])
            }
            else{
                let msg= {
                    StatusCode :'404',
                    message:'command not found'
                }
                next(msg)

            }
        })
        .catch(err=>{
            if(err.message != 0){
                err.StatusCode = 400
            }
            next(err)
        })
    }

    static deleteProduct(req,res,next){
        Product
        .findOne({where:{id:req.params.id}})
        .then(data=>{
            if(data){
                return Task.destroy({where:{id:req.params.id}})
            }
            else{
                let msg= {
                    StatusCode :'404',
                    message:'command not found'
                }
                next(msg)
            }
        })
        .then(data=>{
                res.status(200).json(isi)
            
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = ProductController