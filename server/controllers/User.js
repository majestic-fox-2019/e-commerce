const User = require("../models").User
const generateToken = require("../helpers/generateToken")
const matchPassword = require("../helpers/matchPass")

class ControlUser {
    static getAllUser(req, res, next) {
        User.findAll()
            .then(allUsers => {
                res.status(200).json(allUsers)
            })
            .catch(err => {
                next(err)
            })
    }
    static register(req, res, next) {
        let peran
        if (!req.body.role) {
            peran = "user"
        } else {
            peran = req.body.role
        }
        User.findOne({
            where: { email: req.body.email }
        })
            .then(emailFound => {

                if (emailFound) {
                    throw ({ code: 400, message: "email already registered" })
                }
                else {

                    return User.create({
                        name: req.body.name,
                        password: req.body.password,
                        email: req.body.email,
                        role: peran
                    })
                }
            })
            .then(userRegistered => {
                const token = generateToken({ id: userRegistered.id })
                req.headers.token = token
                res.status(201).json({ userRegistered, token })
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        User.findOne({ where: { email: req.body.email } })
            .then(userLoginFound => {
                if (userLoginFound) {
                    if (userLoginFound.password == req.body.password) {
                        const token = generateToken({ id: userLoginFound.id })
                        req.headers.token = token
                        res.status(200).json({ userLoginFound, token })
                    } else {

                        const match = matchPassword(req.body.password, userLoginFound.password)
                        if (match) {
                            const token = generateToken({ id: userLoginFound.id })
                            req.headers.token = token
                            res.status(200).json({ userLoginFound, token })
                        } else {
                            throw ({ code: 400, message: "wrong email/password" })
                        }
                    }
                } else {
                    throw ({ code: 400, message: "wrong email/password" })
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = ControlUser