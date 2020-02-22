const AuthHelper = require('../helpers/AuthHelper')
const createError = require('http-errors')

module.exports = (req, res, next) => {
  try {
    const token = req.headers.token
    const user = AuthHelper.verifyToken(token)
    req.user = user
    next()
  } catch (error) {
    throw createError(403, { name : 'Authorization', message : 'Forbidden' })
  }
}