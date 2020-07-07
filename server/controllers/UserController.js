const { User } = require('../models')
const { generateToken } = require('../middlewares/jwt')
const { compareHash } = require('../helpers/bcrypt')

class UserController {
    static register(req, res, next) {
        const { name, phone, address, email, password, role } = req.body
        User.create({
            name,
            phone,
            address,
            email,
            password,
            role
        })
        .then(user => {
            let obj = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
            const token = generateToken(obj)
            res.status(201).json({
                id: user.id,
                name: user.name,
                phone: user.phone,
                address: user.address,
                email: user.email,
                role: user.role,
                token: token
            })
        })
        .catch(next)
    }

    static login(req, res, next) {
        const { email, password } =  req.body
        User.findOne({
            where: {
                email
            }
        })
        .then(user => {
            if(user) {
                if(compareHash(password, user.password)) {
                    let obj = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    }
                    const token = generateToken(obj)
                    res.status(201).json({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        token: token
                    })
                } else {
                    next({ status: 400, message: 'Email/password wrong' })
                }
            } else {
                next({ status: 400, message: 'Email/password wrong' })
            }
        })
        .catch(next)
    }
}

module.exports = UserController