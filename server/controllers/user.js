const {User} = require('../models')
const createError = require('http-errors')
const bcrypt = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')

class UserController {

  static list(req, res, next) {
    User.findAll({order: [['id', 'ASC']]})
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      next(error)
    })
  }

  static register(req, res, next){
    let regisUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    }

    User.create(regisUser)
    .then(user => {
      // console.log(user)
      let data = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
      res.status(201).json({user, token : jwt.createToken(data)})
    })
    .catch(error => {
      next(error)
    })
  }

  static login(req, res, next){
    let userEmail = {
      where: {
        email: req.body.email
      }
    }
    User.findOne(userEmail)
    .then(user => {
      if (!user){
        throw createError(404, {message: "User Not Found"})
      } else {
        if (user.role == 'admin' && user.password == req.body.password) {
          let data = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          }
          res.status(200).json({data, token: jwt.createToken(data)})
        } else {
          if (bcrypt.checkPassword(req.body.password, user.password)){
            let data = {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role
            }
            res.status(200).json({data, token : jwt.createToken(data)})
          } else {
            throw createError(400, {message: "Email / Password Wrong"})
          }
        }
      }
    })
    .catch(error => {
      console.log(error)
      next(error)
    })
  }

  static update(req, res, next) {
    let userId = {
      where: {
        id: req.params.id
      }
    }

    let userData = {
      name: req.body.name,
      role: req.body.role
    }

    User.update(userData, userId)
    .then(user => {
      res.status(200).json(userData)
    })
    .catch(error => [
      next(error)
    ])
  }

  static delete(req, res, next) {
    let userId = {
      where: {
        id: req.params.id
      }
    }
    let userData = User.findByPk(req.params.id, {hooks: false})
    let userDestroy = User.destroy(userId, {hooks: false})
    Promise.all([userData, userDestroy])
    .then(result => {
      res.status(200).json(`Successfully deleted user ${result[0].name}`)
    })
    .catch(error => {
      next(error)
    })
  }

}

module.exports = UserController