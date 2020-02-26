const { User } = require('../models')
const helper = require('../helpers/helper')
const bcrypt = require('bcrypt')

class UserController {
  static doLogin (req, res, next){
    let email = req.body.email
    let password = req.body.password
    if(email === undefined || password === undefined || email === '' || password === ''){
      throw{
        statusCode: 400,
        message: "Email or Password must be filled"
      }
    }else{
      User.findOne({ where: { email : email } })
      .then(user => {
        if(user){
          if(bcrypt.compareSync(password, user.password)){
            const objUser = {
              id: user.id,
              email: user.email
            }
            const token = helper.authSign(objUser)
            res.status(200).json({ 
              code: 200,
              message: "Login successfull",
              payload: {
                Token: token,
                users: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  role: user.role
                }
              }
            })
          }else{
            throw{
              statusCode: 400,
              message: "Email or password is wrong"
            }
          }
        }else{
          throw{
            statusCode: 404,
            message: "Email not registered"
          }
        }
      })
      .catch(err => {
        next(err)
      })
    }
  }

  static addUser (req, res, next){
    let objUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    }
    User.findOne({
      where: {
        email: objUser.email
      }
    })
    .then(user => {
      if(!user){
        return User.create(objUser)
      }else{
        throw{
          statusCode: 400,
          message: "Email has been registered"
        }
      }
    })
    .then(newuser => {
      res.status(201).json({
        code: 201,
        message: "Register user successfull",
        payload: newuser
      })
    })
    .catch(err => {
      next(err)
    })
  }

  static registerMember(req, res, next){
    let objUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: 'member'
    }
    User.findOne({
      where: {
        email: objUser.email
      }
    })
    .then(user => {
      if(!user){
        return User.create(objUser)
      }else{
        throw{
          statusCode: 400,
          message: "Email has been registered"
        }
      }
    })
    .then(newuser => {
      res.status(201).json({
        code: 201,
        message: "Register user successfull",
        payload: newuser
      })
    })
    .catch(err => {
      next(err)
    })
  }

  static verifyUser(req, res, next){
    let token = req.body.token
    let userToken = helper.authVerify(token)
    if(userToken){
      res.status(200).json({
        code: 200,
        message: "Token is verifying"
      })
    }else{
      next({
        statusCode: 402,
        message: "Token is unverifying"
      })
    }
  }

  static getDataUser (req, res, next){
    User.findAll({
      attributes: { exclude: ['password'] }
    })
    .then(users => {
      res.status(200).json({
        code: 200,
        message: "Get data user successfull",
        payload: users
      })
    })
    .catch(err => {
      next(err)
    })
  }

  static detailUser(req, res, next){
    const id_user = Number(req.params.id)
    User.findOne({
      where: { id: id_user },
      attributes: { exclude: ['password'] }
    })
    .then(user => {
      if(user){
        res.status(200).json({
          code: 200,
          message: "Get detail user successfull",
          payload: user
        })
      }else{
        throw{
          statusCode: 404,
          message: "User not found"
        }
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static updateUser(req, res, next){
    const updateData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role
    }

    const id_user = Number(req.params.id)

    User.findOne({
      where: { id: id_user }
    })
    .then(finduser => {
      if(finduser){
        return finduser.update(updateData, { returning : true })
      }else{
        throw{
          statusCode: 404,
          message: "User not found"
        }
      }
    })
    .then(result => {
      res.status(200).json({
        code: 200,
        message: "Update user successfull",
        payload: result
      })
    })
    .catch(err => {
      next(err)
    })
  }

  static changePass(req, res, next){
    const id_user = Number(req.params.id)
    let changePassword = req.body.password
    User.findByPk(id_user)
    .then(user => {
      if(user){
        return user.update({ password : changePassword })
      }else{
        throw{
          statusCode: 404,
          message: "User not found"
        }
      }
    })
    .then(() => {
      res.status(200).json({
        code: 200,
        message: "Change password user successfull",
      })
    })
    .catch(err => {
      next(err)
    })
  }

  static deleteUser(req, res, next){
    const id_user = Number(req.params.id)
    let dataDelete
    User.findByPk(id_user)
    .then(user => {
      if(user){
        dataDelete = user
        return user.destroy()
      }else{
        throw{
          statusCode: 404,
          message: "User not found"
        }
      }
    })
    .then(() => {
      res.status(200).json({
        code: 200,
        message: "Delete user successfull",
        payload: dataDelete
      })
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = UserController