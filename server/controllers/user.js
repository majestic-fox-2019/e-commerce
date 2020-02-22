const { User } = require('../database/models/index')
const { compare, sign } = require('../helpers/helper')
const createError = require('http-errors')

class UserController {
    static login(req, res, next) {
        if (!req.body.email || !req.body.password) {
            console.log('Masuk')
            next(createError(400, 'Email or password cannot be empty'))
        } else {
            const options = {
                where: {
                    email: req.body.email
                }
            }
            User
                .findOne(options)
                .then(user => {
                    if (user) {
                        if (compare(req.body.password, user.password)) {
                            const access_token = sign({ id: user.id })
                            res.status(200).json({ access_token, email: user.email })
                        }
                    } else {
                        next(createError(404, 'Invalid email or password'))
                    }
                })
                .catch(next)
        }
    }

    static getUsers(req, res, next) {
        console.log('users')
        User
            .findAll()
            .then(users => {
                if (users.length !== 0) {
                    res.status(200).json(users)
                } else {
                    res.status(200).json({ message: 'No user available yet' })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    static postUser(req, res, next) {
        if (!req.body.email || !req.body.password) {
            res.status(400).json({ message: 'Email or password cannot be empty' })
        } else {
            const options = {
                where: {
                    email: req.body.email
                }
            }
            User
                .findOne(options)
                .then(user => {
                    if (user) {
                        return 'Email already registered'
                    } else {
                        const value = {
                            email: req.body.email,
                            password: req.body.password
                        }
                        return User.create(value)
                    }
                })
                .then(user => {
                    if (typeof user === 'string') {
                        res.status(409).json({ message: user })
                    } else {
                        res.status(201).json(user)
                    }
                })
                .catch(next)
        }
    }

    static putUser(req, res, next){
        console.log('Masuk update')
    }
}

module.exports = UserController