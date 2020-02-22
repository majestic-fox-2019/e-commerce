const createError = require('http-errors')
function authorize(req, res, next) {
  if (req.userInfo.isAdmin) {
    next()
  } else {
    let err = createError(403, 'Forbidden Access')
    next(err)
  }
}

module.exports = authorize
