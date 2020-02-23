const { verifyToken } = require('../helpers/jwt')
const { User } = require('../database/models/index')
const createError = require('http-errors')

module.exports = (req, res, next) => {
    try {
        const decodedToken = verifyToken(req.headers.token, process.env.JWT_SECRET)
        User.findAll()
            .then(users => {
                if (users.length > 0) {
                    return User.findOne({
                        where: { id: decodedToken.id }
                    })
                } else {
                    return 0
                }
            })
            .then(user => {
                if (user === 0) {
                    req.loggedUserId = decodedToken.id
                    next()
                } else if (user) {
                    req.loggedUserId = decodedToken.id
                    next()
                } else {
                    throw next(createError(404, 'User not found'))
                }
            })
            .catch(next)
    } catch (error) {
        next(error)
    }
}