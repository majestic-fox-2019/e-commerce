const { User } = require('../models/index')
const createError = require('http-errors')

module.exports = (req, res, next) => {

  let id = req.params.user_id
  let kondisi

  kondisi = {
    where : {
      id : id
    }
  }
  

  User
  .findOne(kondisi)
  .then(response => {
      if(response != null){
        next()
      }else{
        throw createError(404, { name: 'Nodata', message: `User doesn't exist!` })
      }
    })
    .catch(next)
}