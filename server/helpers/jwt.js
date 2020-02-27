const jwt = require('jsonwebtoken')

function generateToken(payload) {
    return jwt.sign(payload, process.env.SECRET_CODE)
}

function verifyToken(payload) {
    return jwt.verify(payload, process.env.SECRET_CODE)
}

module.exports = { generateToken, verifyToken }