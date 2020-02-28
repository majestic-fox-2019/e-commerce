const User = require('../models').User;
const {comparer} = require('../helpers/bcrypt');
const {tokenSigner} = require('../helpers/jwt');

class UserController {
    static register(req,res,next){

        //determining the role
        let role = 'user'
        if(req.body.password === '4dm1n'){
            role = 'admin'
        }
        req.body.role = role

        User.create(req.body)
        .then(response => {
            let user = {
                id : response.id,
                email : response.email,
                password : response.password,
                role : response.role
            }
            let token = tokenSigner(user)
            let role = response.role
            let email = response.email
            res.status(201).json({token, role, email})
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }
    
    static login(req,res,next){
        if(!req.body.email || !req.body.password){
            next('login-required')
            return
        }

        User.findOne({
            where : {
                email : req.body.email
            }
        })
        .then(response =>{
            if(!response){
                next('user-not-found')
            } else {
                console.log(comparer(req.body.password,response.password))
                if(comparer(req.body.password,response.password)){
                    let user = {
                        id : response.id,
                        email : response.email,
                        password : response.password,
                        role : response.role
                    }
                    let token = tokenSigner(user)
                    let role = response.role
                    let email = response.email
                    res.status(200).json({token,role,email})
                } else {
                    next('invalid-password')
                }
            }
        })
    }
    
}

module.exports = UserController