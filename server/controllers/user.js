'use strict'

const { User } = require("../models")
const { compare, sign } = require("../helpers")

class userController {
    static register (req, res, next) {
        console.log(req.body)
        User.create({
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role || "user"
        })
        .then(result => {
            res.status(201).json(result)
        })
        .catch(next)
    }

    static login (req, res, next) {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(result => {
            if(!result){
                throw {code:404,  message: "please check your email and password"}
            } else {
                const comparePass = compare(req.body.password, result.password)
                if(!comparePass){
                    throw {code:404,  message: "please check your email and password"}
                } else {
                    const token = sign(result.id, result.role)
                    res.status(200).json({token, role: result.role})
                }
            }
        })
        .catch(next)
    }
}

module.exports = userController