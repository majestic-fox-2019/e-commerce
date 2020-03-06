"use strict"
const { verify } = require("../helpers")
const { Cart, User } = require("../models")

function errorHandler (err, req, res, next) {
    console.log(err.name)
    const errors = []
    let code = null
    if(err.name === 'SequelizeValidationError'){
        err.errors.forEach(error => {
            errors.push(error.message)
        })
        code = 400
    } else if (err.code){
        code = err.code
        errors.push(err.message)
    } 
    else {
        code = 500
        errors.push("internal server error")
    }
    res.status(code).json({message: errors.join(", ")})
}

async function authentication(req, res, next){
    try {
        const bearer = req.headers['authorization']
        const tokenBearer = bearer.split(" ")
        const token = tokenBearer[1]
        const verifyToken = await verify(token)
        
        req.id = verifyToken.id
        req.role = verifyToken.role

        next()
    } catch (err) {
        next(err)
    }

}

function authorization(req, res, next) {
    if(req.role === 'admin'){
        next()
    } else if(req.role === 'user'){
        User.findOne({
            where: {
                id: req.id
            }
        })
        .then(result => {
            if(!result) throw {code: 404, message: "user not found"}
            return Cart.findOne({
                where: {
                    UserId : result.id
                }
            })
        })
        .then(result => {
            if(!result) throw {code: 403, message: "you dont have acces to edit/delete this data"}
            next()
        })
        .catch(next)
    } 
    else {
        next({code: 403, message: "you dont have access"})
    }
}


module.exports= {
    errorHandler,
    authentication,
    authorization  
}