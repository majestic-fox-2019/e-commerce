const { User, Role, Product } = require('../database/models/index')
const { compare, sign } = require('../helpers/helper')
const createError = require('http-errors')
const { OAuth2Client } = require('google-auth-library');

class UserController {
    static login(req, res, next) {
        if (!req.body.email || !req.body.password) {
            next(createError(400, 'Email or password cannot be empty'))
        } else {
            const options = {
                where: {
                    email: req.body.email
                },
                include: [Role, Product]
            }
            User
                .findOne(options)
                .then(user => {
                    if (user) {
                        console.log(user)
                        if (compare(req.body.password, user.password)) {
                            const access_token = sign({ id: user.id })
                            res.status(200).json({ access_token, email: user.email, role: user.Role.name, carts: user.Products })
                        } else {
                            next(createError(404, 'Invalid email or password'))
                        }
                    } else {
                        next(createError(404, 'Invalid email or password'))
                    }
                })
                .catch(next => console.log(next))
        }
    }

    static googleSignIn(req, res, next) {
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let newEmail = null
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.CLIENT_ID
        }).then(ticket => {
            const payload = ticket.getPayload()
            newEmail = payload.email
            return User.findOne({ where: { email: newEmail }, include: [Role, Product] })
        }).then(user => {
            if (user) {
                return user
            } else {
                const value = { email: newEmail, password: 'google-sign', RoleId: 3 }
                return User.create(value)
            }
        }).then(user => {
            const access_token = sign({ id: user.id })
            res.status(200).json({ access_token, email: user.email, carts: user.Products || [], role: user.Role ? user.Role.name : 'member' })
        }).catch(next => console.log(next))
    }

    static getUsers(req, res, next) {
        User
            .findAll()
            .then(users => {
                if (users.length !== 0) {
                    res.status(200).json(users)
                } else {
                    res.status(200).json({ message: 'No user available yet' })
                }
            })
            .catch(next)
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
                            password: req.body.password,
                            RoleId: req.body.RoleId
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

    static putUser(req, res, next) {
        const { email, password } = req.body
        if (email && password) {
            const value = {
                email, password
            }
            const options = { where: { id: req.loggedUserId } }
            User
                .update(value, options)
                .then(result => {
                    res.status(200).json({ message: 'Successfully updated user' })
                })
                .catch(next)

        } else {
            next(createError(400, 'Email and password cannot be empty'))
        }
    }

    static deleteUser(req, res, next) {
        User
            .destroy({ where: { id: req.params.id } })
            .then(result => {
                if (result) {
                    res.status(200).json({ message: 'Successfully deleted user' })
                }
            })
            .catch(next)
    }
}

module.exports = UserController