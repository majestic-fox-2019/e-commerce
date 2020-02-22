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
            email: userData.email,
            isAdmin: userData.isAdmin
          }
          const token = generateToken(payload)
          let data = {
            token: token,
            username: userData.username
          }
          if (userData.isAdmin) {
            data.isAdmin = userData.isAdmin
          }
          res.status(200).json(data)
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
          email: newUser.email,
          isAdmin: newUser.isAdmin
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

  static gSignIn(req, res, next) {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then((user) => {
        if (user) {
          return user
        } else {
          const randomizedUser = require('../helpers/randomizedUser')
          return User.create({
            username: randomizedUser(req.body.username),
            email: req.body.email,
            password: process.env.G_DEF_PASS,
            platform: 'google'
          })
        }
      })
      .then((user) => {
        const payload = {
          id: user.id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin
        }
        const token = generateToken(payload)
        res.status(201).json({
          token: token,
          username: user.username,
          email: user.email
        })
      })
      .catch((err) => {
        next(err)
      })
  }
}

module.exports = ControllerUser
