const { verifyToken } = require('./jwt')
const { User } = require('../models')

function authentication(req, res, next) {
    try {
        req.userLoggedIn = verifyToken(req.headers.token)
        User.findByPk(req.userLoggedIn.id)
        .then(user => {
            if(user) {
                next()
            } else {
                next({ status: 403, message: 'Invalid access'})
            }
        })
        .catch(next)
    }
    catch {
        next({ status: 401, message: 'User must login first' })
    }
}

function authorization(req, res, next) {
    const id = req.userLoggedIn.id
    User.findByPk(id)
    .then(user => {
        if(user) {
            if(user.role === 'admin') {
                next()
            } else {
                next({ status: 403, message: 'User not authorize' })
            }
        } else {
            next({ status: 404, message: 'Forbidden access' })
        }
    })
}

module.exports = {
    authentication,
    authorization
}