const {User, History} = require('../models')
const {compare} = require('../helper/bcrypt')
const {generateToken} = require('../helper/jwt')

class UserController {
  static token(req,res,next){
    let {username, email, password} = req.body
    User.findOne({
      where: {
        email
      }
    })
    .then(avail=>{
      if(avail == null){
        return User.create({username, role: 'member', email, password})
      }else{
        throw {
          status: 400,
          message: `email has been taken`
        }
      }  
    })
    .then(user=>{
      let userObj = {
        id: user.id,
        username: user.username,
        email: user.email
      }
      res.status(201).json(userObj)
    })
    .catch(err=>{
      next(err)
    })
  }

  static register(req,res,next){
    let {username, email, password} = req.body
    User.findOne({
      where: {
        email
      }
    })
    .then(avail=>{
      if(avail == null){
        return User.create({username, role: 'member', email, password})
      }else{
        throw {
          status: 400,
          message: `email has been taken`
        }
      }  
    })
    .then(user=>{
      let userObj = {
        id: user.id,
        username: user.username,
        email: user.email
      }
      res.status(201).json(userObj)
    })
    .catch(err=>{
      next(err)
    })
  }

  static login(req,res,next){
    let {email, password} = req.body
    User.findOne({
      where: {
        email
      }
    })
    .then(user=>{
      console.log(user)
      if(user !== null && compare(password,user.password)){
        let userObj = {
          id: user.id,
          username: user.username,
          role: user.role,
          email: user.email
        }
        let token = generateToken(userObj)
        res.status(200).json({token, email})
      }else{
        throw {
          status: 400,
          message: `email/password error`
        }
      }
    })
    .catch(err=>{
      next(err)
    })
  }

  static listUser(req,res,next){
    User.findAll({
      attributes: { exclude: ['password'] }
    })
      .then(users=>{
        res.status(200).json(users)
      })
      .catch(err=>{
        next(err)
      })
  }

  static history(req,res,next) {
    History.findAll({
      where: {
        email: req.user.email
      },
      order: [
        ['createdAt', 'DESC'],
      ],
    })
      .then(history=>{
        res.status(200).json(history)
      })
      .catch(error=>{
        next(error)
      })
  }

  static allhistory(req,res,next) {
    History.findAll({
      order: [
        ['createdAt', 'DESC'],
      ],
    })
      .then(history=>{
        res.status(200).json(history)
      })
      .catch(error=>{
        next(error)
      })
  }
}



module.exports = UserController