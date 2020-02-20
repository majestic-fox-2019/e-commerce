const jwt = require("jsonwebtoken")

function createToken(idUser) {
    return jwt.sign({ id: idUser }, process.env.JWT_SECRET)
}

function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {
    createToken,
    verifyToken
}