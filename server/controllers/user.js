const { User } = require('../models')
const errors = require('http-errors')
const jwt = require('jsonwebtoken')
const bcyrpt = require('bcrypt')

class ControllerUser {

  static register(req, res, next) {
    let { username, email, password } = req.body
    let member = 'member'
    User
      .create({
        username,
        email,
        password,
        role: member
      })
      .then(registerUser => {
        const token = jwt.sign({ email: registerUser.email, id: registerUser.id }, process.env.EDOTENSI)
        // res.status(200).json(token)
        res.status(201).json(token)
      })
      .catch((err) => {
        // throw errors
        if (err.message != 0) {
          err.statusCode = '400'
        } else {
          err.statusCode = '500'
        }
        next(err)
      })
  }


  static registerAdmin(req, res, next) {
    let { username, email, password } = req.body
    let admin = 'admin'
    User
      .create({
        username,
        email,
        password,
        role: admin
      })
      .then(registerAdmin => {
        const token = jwt.sign({ email: registerAdmin.email, id: registerAdmin.id }, process.env.EDOTENSI)
        res.status(200).json(token)
      })
      .catch((err) => {
        // throw errors
        if (err.message != 0) {
          err.statusCode = '400'
        } else {
          err.statusCode = '500'
        }
        next(err)
      })
  }

  static login(req, res, next) {
    let email = req.body.email
    let password = req.body.password
    User
      .findOne({ where: { email: email, role: 'member' } })
      .then(user => {
        if (!user) {
          res.status(401).json({ message: "Unauthorized" })
        } else {
          if (bcyrpt.compareSync(password, user.password)) {
            const token = jwt.sign({ email: user.email, id: user.id, role: use.role }, process.env.EDOTENSI)
            res.status(200).json(token)
          } else {
            res.status(401).json({ message: "Unauthorized" })
          }
        }
      })
      .catch(err => {
        res.status(404).json(err.message)
      })
  }

  static loginAdmin(req, res, next) {
    let email = req.body.email
    let password = req.body.password
    User
      .findOne({ where: { email: email, role: 'admin' } })
      .then(user => {
        if (!user) {
          res.status(401).json({ message: "Unauthorized" })
        } else {
          if (bcyrpt.compareSync(password, user.password)) {
            const token = jwt.sign({ email: user.email, id: user.id, role: user.role }, process.env.EDOTENSI)
            res.status(200).json(token)
          } else {
            res.status(401).json({ message: "Unauthorized" })
          }
        }
      })
      .catch(err => {
        res.status(404).json(err.message)
      })
  }


}

module.exports = ControllerUser