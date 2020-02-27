const { jwtVerify } = require('../helpers/jwt')
const createError = require('http-errors')
module.exports = function(req,res,next){
  try {
    let token = jwtVerify(req.headers.token)
    req.user = token
    next()
  } catch (error) {
    next(createError(401,'Invalid token'))
  }
}