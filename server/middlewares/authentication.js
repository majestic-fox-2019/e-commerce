const { verifyToken } = require('../helpers/jwt')

module.exports = (req, res, next) => {
  const token = req.headers.token
  try {
    const payload = verifyToken(token)
    req.loggedIn = payload
    next()
  } catch (err) {
    next(err)
  }
}
