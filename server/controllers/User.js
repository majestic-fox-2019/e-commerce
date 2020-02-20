"use strict"

const { createToken } = require('../helpers/jwt')
const { checkPassword } = require('../helpers/bcrypt')
const { User } = require('../models')
const createError = require("http-errors")

class UserController {
    static register(req, res, next) {
        const { email, password, username, role } = req.body
        User.create({
            username,
            email,
            password,
            role: role || "customer"
        })
            .then((user) => {
                const token = createToken(user.id)
                res.status(201).json({ user, token })
            }).catch(next)
    }
    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({
            where: {
                email
            }
        })
            .then((user) => {
                if (user) {
                    const pwd = checkPassword(password, user.password)
                    if (pwd) {
                        const token = createToken(user.id)
                        res.status(200).json({ user, token })
                    } else {
                        next(createError(400, "email/password wrong"))
                    }
                } else {
                    next(createError(400, "email/password wrong"))
                }
            }).catch(next);
    }
}

module.exports = UserController