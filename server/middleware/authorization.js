// find id product by params
// compare UserId product with req.user.id


const { Product } = require('../models')
const createError = require('http-errors')

module.exports = function(req,res,next){
  Product
  .findOne({
    where: {id : req.params.id}
  })
  .then(result=>{
      if(result.UserId == req.user.id){
        next()
      }else{
        
        throw createError(403,'Unauthorized')
      }
    })
    .catch(err=>{
      next(err)
    })
    
}