"use strict"

const { User } = require("../models")
const jwt = require('../helper/jwt')
const bcrypt = require('../helper/bcrypt')

class UserController {
    static create(req, res, next) {
        const body = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            roles: 'user'
        }
        User.create(body)
            .then(user => {
                const token = jwt.generateToken(user)
                res.status(201).json({
                    access_token: token,
                    user
                })
            })
            .catch(next)
    }

    static login(req, res, next) {
        User.findOne({ where: { email: req.body.email } })
            .then(user => {
                if (!user) {
                    next({ message: 'email/password salah' })
                } else {
                    if (user.roles === 'admin') {
                        const token = jwt.generateToken(user)
                        res.status(201).json({
                            access_token: token,
                            user
                        })
                    } else {
                        if (!bcrypt.checkPassword(req.body.password, user.password)) {
                            next({ message: 'email/password salah' })
                        } else {
                            const token = jwt.generateToken(user)
                            res.status(201).json({
                                access_token: token,
                                user
                            })
                        }
                    }

                }
            })
            .catch(next)
    }
}


module.exports = UserController