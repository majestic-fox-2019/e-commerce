const { User, Product } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')

class UserController {
  static userRegister(req, res, next) {
    let user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    User
      .create(user)
      .then(user => {
        res.status(201).json(user)
      })
      .catch(err => {
        next(err)
      })
  }

  static userLogin(req, res, next) {
    let user = {
      email: req.body.email,
      password: req.body.password
    }
    User
      .findOne({
        where: {
          email: user.email
        }
      })
      .then(result => {
        if (result) {
          const compare = bcrypt.compareSync(user.password, result.password)
          if (compare) {
            const token = jwt.sign({ id: result.id, email: result.email, role: result.role }, process.env.JWT_TOKEN)
            res.status(200).json({ token, role: result.role, name: result.name })
          } else {
            let msg = {
              statusCode: 404,
              message: 'Invalid email / password!'
            }
            res.status(msg.statusCode).json(msg)
          }
        } else {
          let msg = {
            statusCode: 404,
            message: 'Not found!'
          }
          res.status(msg.statusCode).json(msg)
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static userCart(req, res, next) {
    User
      .findOne({
        where: {
          id: req.user.id
        },
        include: Product
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static googleSignIn(req, res, next) {
    let user = null
    const client = new OAuth2Client(process.env.CLIENT_ID);
    client
      .verifyIdToken({
        idToken: req.body.id_token,
        audience: process.env.CLIENT_ID
      })
      .then(result => {
        user = result.getPayload()
        return User
          .findOne({
            where: {
              email: user.email
            }
          })
      })
      .then(result => {
        if (result) {
          const token = jwt.sign({ email: result.email, id: result.id }, process.env.JWT_TOKEN);
          res.status(200).json({ token, role: result.role, name: result.name })
        } else {
          return User
            .create({
              name: user.name,
              email: user.email,
              password: user.name + user.iat
            })
        }
      })
      .then(result => {
        const token = jwt.sign({ email: result.email, id: result.id }, process.env.JWT_TOKEN);
        res.status(200).json({ token, role: result.role, name: result.name })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = UserController