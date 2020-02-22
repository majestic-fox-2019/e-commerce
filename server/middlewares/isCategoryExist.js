const { Category } = require('../models/index')
const createError = require('http-errors')

module.exports = (req, res, next) => {

  Category
    .findByPk(req.params.category_id)
    .then(response => {
      if(response != null){
        next()
      }else{
        throw createError(404, { name : 'Nodata', message : 'Category Not Found' })
      }
    })

}