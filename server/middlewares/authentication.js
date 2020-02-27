const jwt = require('../helpers/jwt')
const createError = require('http-errors')

module.exports = (req, res, next) => {
    try {
        if (req.headers.token) {
            req.user = jwt.verifyToken(req.headers.token)
            next()
        } else {
            throw (createError(401, 'Invalid Token'))
        }
    }
    catch (error) {
        next(error)
    }
}