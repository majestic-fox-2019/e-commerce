const { Category } = require('../models')

class CategoryController {
  static getListCategory(req, res, next){
    Category.findAll({
      order: [['id', 'ASC']]
    })
    .then(category => {
      res.status(200).json({
        code: 200,
        message: 'Get category list successfull',
        payload: category
      })
    })
    .catch(err => {
      next(err)
    })
  }

  static createCategory(req, res, next){
    let objCategory = {
      name: req.body.name
    }
    Category.findOne({
      where: { name: objCategory.name }
    })
    .then(category => {
      if(!category){
        return Category.create(objCategory)
      }else{
        throw{
          statusCode: 400,
          message: "Category already exist"
        }
      }
    })
    .then(newcategory => {
      res.status(201).json({
        code: 201,
        message: "Create category successfull",
        payload: newcategory
      })
    })
    .catch(err => {
      console.log('masuk sini')
      console.log(err)
      next(err)
    })
  }

  static getDetailCategory(req, res, next){
    const id_category = req.params.id
    Category.findByPk(id_category)
    .then(category => {
      if(category){
        res.status(200).json({
          code: 200,
          message: 'Get detail category successfull',
          payload: category
        })
      }else{
        throw {
          statusCode: 404,
          message: "Category not found"
        }
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static updateCategory(req, res, next){
    const updateDataCategory = {
      name: req.body.name
    }

    const id_category = Number(req.params.id)
    
    Category.findByPk(id_category)
    .then(category => {
      if(category){
        return category.update(updateDataCategory, { returning : true })
      }else{
        throw {
          statusCode: 404,
          message: "Category not found"
        }
      }
    })
    .then(result => {
      res.status(200).json({
        code: 200,
        message: 'Update category successfull',
        payload: result
      })
    })
    .catch(err => {
      next(err)
    })
  }

  static deleteCategory(req, res, next){
    const id_category = Number(req.params.id)
    let dataDelete
    Category.findByPk(id_category)
    .then(category => {
      if(category){
        dataDelete = category
        return category.destroy()
      }else{
        throw{
          statusCode: 404,
          message: "Category not found"
        }
      }
    })
    .then(() => {
      res.status(200).json({
        code: 200,
        message: 'Delete category successfull',
        payload: dataDelete
      })
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = CategoryController