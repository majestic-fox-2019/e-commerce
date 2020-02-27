const jwt = require('jsonwebtoken')

class Jwt {
  static createToken(token){
    return jwt.sign(token, process.env.JWT_SECRET)
  }

  static verify(token){
    return jwt.verify(token, process.env.JWT_SECRET)
  }
}

module.exports = Jwt