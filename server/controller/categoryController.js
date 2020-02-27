const {Category, Product} = require('../models')

class CategoryController {
  static list(req,res,next) {
    Category.findAll()
      .then(data=>{
        res.status(200).json(data)
      })
      .catch(err=>{
        next(err)
      })
  }

  static deleteCategory(req,res,next) {
    Product.findOne({
      where: {
        CategoryId: req.params.id
      }
    })
      .then(data=>{
        if(data !== null) {
          console.log('datekk')
          throw {
            status: 400,
            message: `there is some product using the category`
          }
        }else{
          return Category.destroy({
            where: {
              id: req.params.id
            }
          })
        }
      })
      .then(deleted=>{
        res.status(200).json(deleted)
      })
      .catch(err=>{
        next(err)
      })
  }

  static updateCategory (req,res,next) {
    let data = {
      name: req.body.name
    }
    Category.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(found=>{
        if(found){
          return Category.update(data,{
            where: {
              id: req.params.id
            }
          })
        }else {
          throw {
            status: 404,
            message: `category not found`
          }
        }
      })
      .then(updated=>{
        res.status(200).json(updated)
      })
      .catch(err=>{
        next(err)
      })
  }

  static addCategory (req,res,next) {
    let {name} = req.body
    Category.findOne({
      where: {
        name
      }
    })
      .then(avail=>{
        if(avail == null) {
          return Category.create({name, addedBy: req.user.email})
        }else{
          throw {
            status: 400,
            message: `category name already used`
          }
        }
      })
      .then(category=>{
        res.status(201).json(category)
      })
      .catch(err=>{
        next(err)
      })
  }
}

module.exports = CategoryController