const { Category } = require('../models/index')
const { Op } = require('sequelize').Sequelize

class CategoryController {

  static createCategory(req, res, next){
    const data = {
      category_name : req.body.category_name
    }

    Category
      .create(data)
      .then(response => {
        res.status(200).json(response)
      })
      .catch(next)
  }

  static getAllCategory(req, res, next){

    const query = req.query.status || ''

    Category
      .findAll({
        where : {
          category_name : {
            [Op.like] : `%${query}%`
          }
        }
      })
      .then(response => {
        if(response.length > 0){
          res.status(200).json(response)
        }else{
          res.status(200).json({
            message : 'Category is empty!'
          })
        }
      })
      .catch(next)

  }

  static updateCategory(req, res, next){
    const data = {
      category_name : req.body.category_name
    }

    Category.update(data, { 
      where : {
        id : req.params.category_id
      },
      returning : true,
    })
    .then(response => {
      res.status(200).json(response[1][0])
    })
    .catch(next)
  }

  static deleteCategory(req, res, next){
    let data = {}

    Category
      .findByPk(req.params.category_id)
      .then(response => {
        data = response
        return response.destroy()
      })
      .then(response => {
        res.status(200).json(data)
      })
      .catch(next)

  }

}

module.exports = CategoryController