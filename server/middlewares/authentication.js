const jwt = require('jsonwebtoken')

function authentication (req, res, next) {
  console.log("masuk authn", req.headers.token)
  try {
    const token = req.headers.token
    const user = jwt.verify(token, process.env.DATA_SECRET)
    req.user = user
    console.log(req.user, "<<<<<")
    next()
  } catch (error) {
    console.log(error)
    next({code: 401, message: "invalid token"})
  }
}

module.exports = authentication