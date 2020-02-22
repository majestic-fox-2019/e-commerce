const { User } = require('../models/index')
const AuthHelper = require('../helpers/AuthHelper')
const createError = require('http-errors')
const { Op } = require('sequelize').Sequelize

class UserController {

  static registerUser (req, res, next){
    const objValue = {
      name : req.body.name,
      email : req.body.email,
      password : req.body.password,
      roles : req.body.roles
    }

    User
      .create(objValue)
      .then(response => {
        res.status(200).json(response)
      })
      .catch(next)
  }

  static createAdmin(req, res, next){
    const objValue = {
      name : req.body.name,
      email : req.body.email,
      password : req.body.password,
      roles : 'admin'
    }

    User
      .create(objValue)
      .then(response => {
        res.status(200).json(response)
      })
      .catch(next)
  }

  static loginAdmin(req, res, next){
    let email = req.body.email
    let password = req.body.password
    User
      .findOne({
        where : {
          email : email
        }
      })
      .then(response => {
        if(response != null && response.roles === 'admin'){
          let user = {
            id : response.id,
            name : response.name,
            email : response.email
          }
          if(AuthHelper.comparePassword(password, response.password)){
            let token = AuthHelper.signToken(user)
            res.status(200).json({
              id: response.id,
              email : response.email,
              token : token
            })
          }else{
            throw createError(404, { name: 'Nodata', message: `Wrong email or password!` })
          }
        }else{
          throw createError(404, { name: 'Nodata', message: `Email doesn't exist!` })
        }
      })
      .catch(next)
  }

  static getUserData(req, res, next){
    let name = req.query.name || ''

    User
      .findAll({
        where : {
          name : {
            [Op.like] : `%${name}%`
          }
        },
        order : [['id', 'ASC']],
      })
      .then(response => {
        if(response.length > 0){
          res.status(200).json(response)
        }else{
          res.status(200).json({
            message : 'User is empty!'
          })
        }
      })
      .catch(next)
  }

  static getUserDataById(req, res, next){
    User
      .findOne({
        where : {
          id : req.params.user_id
        }
      })
      .then(response => {
        res.status(200).json(response)
      })
      .catch(next)
  }

  static updateUserData(req, res, next){
    const objValue = {
      name : req.body.name,
      email : req.body.email,
    }

    User
      .update(objValue, {
        where : {
          id : req.params.user_id
        },
        returning : true
      })
      .then(response => {
        res.status(200).json(response[1][0])
      })
      .catch(next)
  }

  static deleteUserData(req, res, next){
    let data = {}

    User
      .findByPk(req.params.user_id)
      .then(response => {
        data = response
        return response.destroy()
      })
      .then(response => {
        res.status(200).json(data)
      })
      .catch(next)
  }

}

module.exports = UserController