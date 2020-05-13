"use strict"

function authorizeAdmin(req, res, next) {
    try {
        if (req.user.role === 'admin') {
            next()
        } else {
            throw ({
                status: 401,
                message: "you are not admin"
            })
        }
    } catch (err) {
        next({
            status: 401,
            message: "you are not admin"
        })
    }
}

module.exports = authorizeAdmin