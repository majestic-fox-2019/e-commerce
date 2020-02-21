const User = require('../models').User
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class ControllerUser {
  static registerAdmin(req, res, next) {
    let {name, email, password, phone_number, address, role} = req.body
    role = "admin"
    User.create({name, email, password, phone_number, address, role})
    .then(user => {
      res.status(201).json(user)
      // res.status(201).send("berhasil")
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }

  static register(req, res, next) {
    let {name, email, password, phone_number, address, role} = req.body
    role = "consument"
    User.create({name, email, password, phone_number, address, role})
    .then(user => {
      res.status(201).json(user)
      // res.status(201).send("berhasil")
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }

  static login(req, res, next) {
    console.log(req.body)
    User.findOne({where: {email:req.body.email}})
    .then(user => {
      if(!user) {
        next({code: 404, message: "invalid name or email"})
      } else {
        if(!bcrypt.compareSync(req.body.password, user.password)){
          console.log("masuk if")
          next({code: 404, message: "invalid name or email"})
        } else {
          let token = jwt.sign(user.id, process.env.DATA_SECRET)
          req.headers.token = token
          // res.status(201).send("berhasil")
          res.status(201).json({token, user})
        }
      }
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }
}

module.exports = ControllerUser