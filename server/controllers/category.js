const {Category} = require('../models')
const createError = require('http-errors')

class Controller{
    static findAll(req, res, next){
        Category
        .findAll()
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
        Category
        .findOne({
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
        const { name } = req.body
        Category
        .create({ 
            name
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
        const {name} = req.body
        Category
        .update({
            name
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
        const findOne = Category.findOne({where:{id:id}})
        const destroy = Category.destroy({ where:{id:id}})
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