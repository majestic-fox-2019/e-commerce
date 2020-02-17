const { User } = require('../models')
const generateToken = require('../helpers/generateToken')
const createError = require('http-errors')
class ControllerUser {
  static login(req, res, next) {
    let userData
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then((user) => {
        if (!user) {
          let err = createError(400, 'Login error')
          next(err)
        } else {
          userData = user
          const compare = require('../helpers/compare')
          return compare(req.body.password, user.password)
        }
      })
      .then((result) => {
        if (!result) {
          let err = createError(400, 'Login error')
          next(err)
        } else {
          const payload = {
            id: userData.id,
            username: userData.username,
            email: userData.email
          }
          const token = generateToken(payload)
          res.status(200).json({
            token: token,
            username: userData.username
          })
        }
      })
      .catch((err) => {
        next(err)
      })
  }

  static register(req, res, next) {
    const data = {
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      platform: 'normal'
    }
    User.create(data)
      .then((newUser) => {
        const payload = {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email
        }
        const token = generateToken(payload)
        res.status(201).json({
          token: token,
          username: newUser.username,
          email: newUser.email
        })
      })
      .catch((err) => {
        next(err)
      })
  }
}

module.exports = ControllerUser
