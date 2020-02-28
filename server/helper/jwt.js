const jwt = require('jsonwebtoken')
module.exports = {
  generateToken(obj){
    return jwt.sign(obj, process.env.secret)
  },
  verify(token){
    try {
      return jwt.verify(token, process.env.secret)
    } catch(err) {
      throw{
        status: 400,
        message: `invalid token`
      }
    }
  }
}