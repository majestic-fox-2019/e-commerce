const { Product } = require('../models/index')
const createError = require('http-errors')

module.exports = (req, res, next) => {
  Product
    .findByPk(req.params.product_id)
    .then(response => {
      if(response != null){
        next()
      }else{
        throw createError(404, { name: 'Nodata', message: { error: `Product doesn't exist!` }})
      }
    })
    .catch(next)
}