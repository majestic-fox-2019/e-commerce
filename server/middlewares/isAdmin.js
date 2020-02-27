const { User } = require('../models/index')
const createError = require('http-errors')

module.exports = (req, res, next) => {

  console.log(req.user.id)

  User
  .findByPk(req.user.id)
  .then(response => {    
    if(response.roles == 'admin'){
        next()
      }else{
        throw createError(403, { nama : 'Authorization', message : 'Unauthorized'})
      }
    })
    .catch(next)

}