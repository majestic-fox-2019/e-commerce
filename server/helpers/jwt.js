const jwt = require('jsonwebtoken')

function createToken(data) {
  return jwt.sign(data, process.env.JWT_SECRET)
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { createToken, verifyToken }
