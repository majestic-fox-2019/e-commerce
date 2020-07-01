"use strict"

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const saltRound = 8

function sign (id, role) {
    return jwt.sign({id, role}, process.env.JWT_KEY)
}

async function verify (token) {
    try {
        const verifyToken = await jwt.verify(token, process.env.JWT_KEY)
        return verifyToken
    } catch(err){
        throw {code: 403, message: "forbidden"}
    }
}

function hash (password) {
    return bcrypt.hashSync(password, saltRound)
}

function compare (password, hash){
    const match = bcrypt.compareSync(password, hash)
    return match
}

module.exports= {
    sign,
    verify,
    hash,
    compare
}