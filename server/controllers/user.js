const {User} = require('../models')
const {compare} = require('../helpers/hash')
const {jwtSignIn} = require('../helpers/jwt')
const createError = require('http-errors')
class UserController{
  static create(req,res,next){
    const {name,email,password} = req.body
    User
      .findOne({
        where:{
          email
        }
      })
      .then(user => {
        if(!user){
          return User
                  .create({
                    name,
                    email,
                    password,
                    role:"member"
                  })
        }else{
          throw createError(400,"Email already use")
        }
      })
      .then(user => {
        let result = {
          name:user.name,
          email:user.email,
          role:user.role
        }
        res.status(201).json(result)
      })
      .catch(next)
  }

  static login(req,res,next){
    const {email,password} = req.body
    let result = null
    User
      .findOne({
        where:{
          email:email || ''
        }
      })
      .then(user => {
        if(user){
          result = user
          return compare(password,user.password)
        }else{
          throw createError(400,"Email not found")
        }
      })
      .then(compared => {
        if(compared){
          let payload = {
            id:result.id,
            email:result.email
          }
          let token = jwtSignIn(payload)
          res.status(200).json({token,name:result.name})
        }else{
          throw createError(400,"Password is empty or false")
        }
      })
      .catch(next)
  }

  static findAll(req,res,next){
    User
      .findAll({
        where: {
          role: 'Admin'
        }
      })
      .then(users => {
        res.status(200).json(users)
      })
      .catch(next)
  }

  static createAdmin(req,res,next){
    const {name,email,role,password} = req.body
    User
      .findOne({
        where:{
          email
        }
      })
      .then(user => {
        if(!user){
          return User
                  .create({
                    name,
                    email,
                    password,
                    role
                  })
        }else{
          throw createError(400,"Email already use")
        }
      })
      .then(user => {
        let result = {
          name:user.name,
          email:user.email,
          role:user.role
        }
        req.io.emit('users')
        res.status(201).json(result)
      })
      .catch(next)
  }

  static delete(req,res,next){
    let deleted = null
    User
      .findByPk(req.params.id)
      .then(user => {
        if(user){
          deleted = user
          return user.destroy()
        }else{
          throw createError(400,"User not found")
        }
      })
      .then(result => {
        req.io.emit('users')
        res.status(200).json(deleted)
      })
      .catch(next)
  }
}

module.exports = UserController