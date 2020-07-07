const jwt = require('jsonwebtoken')

module.exports = {
    generateToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET || 'SucceSS')
    },
    verifyToken(token) {
        return jwt.verify(token, process.env.JWT_SECRET || 'SucceSS')
    }
}