const { User } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
            const token = jwt.sign({ id: result.id, email: result.email, role: result.role }, 'process.env.JWT_TOKEN')
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
}

module.exports = UserController