const createrror = require('http-errors')
const { Product } = require('../models')

class ProductController{

  static getProduct(req,res,next){
   
    Product
    .findAll()
    .then(result=>{
      if(result.length>0){
        res.status(200).json(result)
      }else{
        res.status(204).json({message: 'data is empty'})
      }
    })
    .catch(err=>{
      console.log(err)
      next(err)
    })
  }

  static postProduct(req,res,next){
    let data = {
      name : req.body.name,
      price : req.body.price,
      stock : req.body.stock,
      imageurl : req.body.imageurl,
    }
    
    Product
    .create(data)
    .then(result=>{
      res.status(201).json(result)
    })
    .catch(err=>{
      console.log(err)
      next(err)
    })
  }

  static getOne(req,res,next){
    Product
      .findOne({
        where : {id : req.params.id}
      })
      .then(result=>{
        res.status(200).json(result)
      })
      .catch(err=>{
        next(err)
      })
  }

  static putProduct(req,res,next){

    let data ={
      name : req.body.name,
      price : req.body.price,
      stock : req.body.stock,
      imageurl : req.body.imageurl,
    }

    Product
      .update(data,{
        where:{id : req.params.id},
        returning : true
      })
      .then(result=>{
        res.status(200).json(data)
      })
      .catch(err=>{
        next(err)
      })
    
  }

  static destroyProduct(req,res,next){
    let id = req.params.id
    let data = {}
    Product
    .findOne({
      where: {id:id}
    })
    .then(result=>{
      data = result
      return Product.destroy({
        where: {id:id}
      })
    })
    .then(()=>{
        res.status(200).json(data)
    })
    .catch(err=>{
      next(err)
    })
  }

}

module.exports = ProductController