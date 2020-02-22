const { User } = require('../database/models/index')
const { compare, sign } = require('../helpers/helper')

class UserController {
    static login(req, res, next) {
        const options = {
            where: {
                email: req.body.email
            }
        }
        User
            .findOne(options)
            .then(user => {
                // console.log(user)
                if (user) {
                    if (compare(req.body.password, user.password)) {
                        const access_token = sign({ id: user.id })
                        res.status(200).json({ access_token, email: user.email })
                    }
                } else {
                    res.status(200).json({ message: 'Invalid email or password' })
                }
            })
            .catch(err => {
                console.log(err)
                // next(err)
            })
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
            .catch(err => {
                console.log(err)
            })
    }

    static postUser(req, res, next) {
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
                // console.log(user)
                if (typeof user === 'string') {
                    res.status(409).json({ message: user })
                } else {
                    res.status(201).json(user)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}

module.exports = UserController