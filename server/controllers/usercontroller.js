const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
// const { OAuth2Client } = require('google-auth-library')
// const client = new OAuth2Client(process.env.CLIENT_ID)
const createError = require('http-errors')



class UserConttroller {

  static registerAdmin(req,res,next){
      let data = {
        name: req.body.name,
        email: req.body.email,
        password : req.body.password,
        role: 'admin'
      }
      let secretKey = req.body.secretkey
      User.findOne({
        where : {
          email : data.email
        }
      })
      .then(avail=>{
        if(avail){
        throw createError(404,'email already exists')
        } else{
          if(secretKey == process.env.SECRET_KEY_ADMIN){
            User.create(data)
            .then(result=>{
              res.status(201).json(result)
            })
            .catch(err=>{
              next(err)
            })
          } else {
            throw createError(403,'Secret Key Invalid')
          }
        }
      })
      .catch(err=>{
        next(err)
      })
    }

  static loginAdmin (req,res,next){
    let data = {
      email: req.body.email,
      password : req.body.password
    }
    User
    .findOne({
      where: 
      {  email : data.email }
    })
    .then(result=>{
      
      if(result == null){
        res.status(404).json({message : 'email not found'})
      } else{
        if(result.dataValues.role == 'admin'){
          if(bcrypt.compareSync(data.password, result.dataValues.password)){
          let newObj = {
              id: result.id,
              email : result.email
            }
            res.status(200).json({token: jwt.sign(newObj, process.env.SECRET_CODE), role: result.role})
          }else{
            res.status(404).json({message : 'email or password wrong'})
        
          }
        } else {
          throw createError(403,'Forbidden')
        }
      }
    })
    .catch(err=>{
      next(err)
    })
  }

  static registerUser(req,res,next){
    let data = {
      name: req.body.name,
      email: req.body.email,
      password : req.body.password,
      role: 'User'
    }
    User.findOne({
      where : {
        email : data.email
      }
    })
    .then(avail=>{
      if(avail){
      throw createError(404,'email already exists')
      } else{
          User.create(data)
          .then(result=>{
            res.status(201).json(result)
          })
          .catch(err=>{
            next(err)
          })
      }
    })
    .catch(err=>{
      next(err)
    })
  }

  static loginUser (req,res,next){
    let data = {
      email: req.body.email,
      password : req.body.password
    }
    console.log(data)
    User
    .findOne({
      where: 
      {  email : data.email }
    })
    .then(result=>{
     
      if(result == null){
        res.status(404).json({message : 'email not found'})
      }else{
        if(result.dataValues.role == 'User'){
          if(bcrypt.compareSync(data.password, result.dataValues.password)){
          let newObj = {
              id: result.id,
              email : result.email
            }
            res.status(200).json({
              token: jwt.sign(newObj, process.env.SECRET_CODE), 
              role: result.role,
              name: result.name,
              id: result.id,
              })
          }else{
            res.status(404).json({message : 'email or password wrong'})
          
          }
        } else {
          throw createError(403,'Forbidden')
        }
      }
    })
    .catch(err=>{
      next(err)
    })
  }



}

module.exports = UserConttroller