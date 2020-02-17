const { User } = require('../models')
const jwt = require('jsonwebtoken')
const { comparePass } = require('../helpers/bcrypt')

class UserController {
    static register(req, res, next) {
        let { name, email, address, password, phone, shopName } = req.body
        User.create({
            name,
            email,
            address,
            phone,
            password,
            shopName,
            role: req.body.role || 'user'
        })
            .then(userData => {
                let userInfo = {
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                    address: userData.address,
                    phone: userData.phone,
                    role: userData.role
                }
                let payload = {
                    id: userData.id,
                    role: userData.role
                }
                let token = jwt.sign(payload, process.env.JWT_SECRET)
                res.status(201).json({ token, userInfo })
            })
            .catch(err => {
                next(err);
            })
    }

    static login(req, res, next) {
        let userInfo
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(userData => {
                if (!userData) {
                    throw ({
                        statusCode: 400,
                        message: 'Invalid email / password'
                    })
                } else {
                    userInfo = {
                        id: userData.id,
                        name: userData.name,
                        email: userData.email,
                        address: userData.address,
                        phone: userData.phone,
                        role: userData.role
                    }
                    return comparePass(req.body.password, userData.password)
                }
            })
            .then(compareResult => {
                if (!compareResult) {
                    throw ({
                        statusCode: 400,
                        message: 'Invalid email / password'
                    })
                } else {
                    let payload = {
                        id: userInfo.id,
                        role: userInfo.role
                    }
                    let token = jwt.sign(payload, process.env.JWT_SECRET)
                    res.status(200).json({
                        token,
                        userInfo
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static registerShop(req, res, next) {
        if (!req.body.shopName) {
            throw({
                statusCode: 400,
                message: 'Please enter shop name'
            })
        } else if (req.body.shopName.toLowerCase() == 'official store'){
            throw({
                statusCode: 400,
                message: 'Invalid shop name'
            })
        } else {
            User.findOne({
                where: {
                    id: req.loggedUser.id
                }
            })
            .then(userData => {
                if(userData.shopName) {
                    throw ({
                        statusCode: 400,
                        message: 'You cannot change you shop name'
                    })
                } else {
                    return User.update({
                        shopName: req.body.shopName
                    }, {
                        where: {
                            id: req.loggedUser.id
                        },
                        returning: true
                    })
                }
            })
                .then(updatedUser => {
                    res.status(200).json(updatedUser[1][0].dataValues)
                })
                .catch(err => {                    
                    next(err)
                })
        }
    }

}

module.exports = UserController