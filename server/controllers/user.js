const {User} = require('../models')
const createError = require('http-errors')
const {generateToken} = require('../helpers/generateToken')
const comparePassword = require('../helpers/comparePassword')

class Controller{
    static register(req, res, next){
        const {email, password, name, username} = req.body
        User
        .findOne({
            where:{
                email:email
            }
        })
        .then(data =>{
            if(data){
                throw createError(409, 'Email already register')
            }else{
                return User.create({
                    name, username, email, password
                })
            }
        })
        .then(data =>{
            res.status(201).json(data)
        })
        .catch(err =>{
            next(err)
        })
    }
    
    static login(req, res, next){        
        const { email, password } = req.body
        User
        .findOne({
            where:{email:email}
        })
        .then(data =>{
            if (!data) {
                throw createError(404, 'User Not Found') 
            }else{
                if (comparePassword(password, data.password)) {
                    const payload = {
                        id: data.id,
                        email: data.email,
                        role: data.role
                    }
                    const token = generateToken(payload)
                    res.status(200).json({token: token})
                }else{
                    throw createError(401, 'Invalid Email or Password')
                }
            }
        })
        .catch(err =>{
            next(err)
        })
    }
    static loginAdmin(req, res, next) {
        const { email, password } = req.body
        User
            .findOne({
                where: {
                    email: email
                }
            })
            .then(data => {
                if (!data) {
                    throw createError(404, 'User Not Found')
                } else {
                    if (data.role !== 'admin') {
                        throw createError(401, 'Unauthorized')
                    }else
                    if (comparePassword(password, data.password)) {
                        const payload = {
                            id: data.id,
                            email: data.email,
                            role: data.role
                        }
                        const token = generateToken(payload)
                        res.status(200).json({
                            token: token
                        })
                    } else {
                        throw createError(401, 'Invalid Email or Password')
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }
    static check(req, res, next) {
        const {
            token
        } = req.headers;
        const {
            id,
            name,
            email
        } = verifyToken(token);
        User.findOne({
                where: {
                    email
                }
            })
            .then(result => {
                res.status(200).json({
                    message: "Verified!"
                });
            })
            .catch(err => {
                next(err);
            });
    }
}

module.exports = Controller