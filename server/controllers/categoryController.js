const {Category} = require('../models/index')

class CategoryController{
    static createCategory(req,res,next){
        Category
        .create({
            name:req.body.name,
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

    static getCategory(req,res,next){
        Category
        .findAll()
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            rnext(err)
        })
    }

    static updateCategory(req,res,next){
        Category
        .update(
            {name:req.body.name
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

    static deleteCategory(req,res,next){
        Category
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

module.exports = CategoryController