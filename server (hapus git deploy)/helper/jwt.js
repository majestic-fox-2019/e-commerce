const jwt = require('jsonwebtoken')
module.exports = {
  generateToken(obj){
    return jwt.sign(obj, process.env.secret)
  },
  verify(token){
    return jwt.verify(token, process.env.secret)
  }
}