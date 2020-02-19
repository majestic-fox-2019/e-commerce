const jwt = require('jsonwebtoken');

function generateToken(obj, jwt_key = process.env.jwt_key) {
    return jwt.sign(obj, jwt_key);
}

function tokenDecode(token, jwt_key = process.env.jwt_key) {
    return jwt.verify(token, jwt_key);
}

module.exports = {
    generateToken,
    tokenDecode
}