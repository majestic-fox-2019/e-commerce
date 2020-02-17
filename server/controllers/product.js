const {Product} = require('../models')
const createError = require('http-errors')

class Controller{
    static findAll(){
        console.log('masuk controller')
        Product
        .findAll({})
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
    static findOne(){
        
    }
    static create(req, res, next){
        const { name, image_url, price, stock } = req.body
        Task
        .create({ 
            name, 
            image_url, 
            price, 
            stock 
        })
        .then(data =>{
            res.status(201).json(data)
        })
        .catch(err =>{
            next(err)
        })
    }
    static update(){
        
    }
    static destroy(){
        
    }
}

module.exports = Controller