const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const compare = (plain, encrypted) => {
    return bcrypt.compareSync(plain, encrypted)
}

const createError = (err) => {
    const temp = []
    err.errors.forEach(error => {
        temp.push(error.message)
    })

    return { message: temp }
}

const hash = (plain) => {
    return bcrypt.hashSync(plain, bcrypt.genSaltSync(10))
}

const sign = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET)
}

module.exports = {
    compare, hash, sign, createError
}