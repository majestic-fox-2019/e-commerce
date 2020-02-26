const { User, Cart, Product } = require('../models')
const { createToken } = require('../helpers/jwt')
const { comparePass } = require('../helpers/bcrypt')

class UserController {
  static register(req, res, next) {
    const form = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      userLocation: req.body.userLocation,
      userLocationId: req.body.userLocationId,
      role: 'basic',
      shop_name: null
    }
    User.create(form)
      .then(result => {
        const token = createToken({ id: result.id, email: result.email })
        res.status(201).json({
          token: token,
          data: {
            id: result.id,
            name: result.name,
            role: result.role,
            userLocation: result.userLocation,
            userLocationId: result.userLocationId,
            shop_name: result.shop_name
          },
          msg: 'User Created'
        })
      })
      .catch(next)
  }

  static login(req, res, next) {
    const form = {
      email: req.body.email,
      password: req.body.password
    }
    User.findOne({ where: { email: form.email } })
      .then(result => {
        if (!result) {
          throw { code: 400, msg: 'Invalid email/password' }
        } else {
          const compare = comparePass(form.password, result.password)
          if (!compare) {
            throw { code: 400, msg: 'Invalid email/password' }
          } else {
            const token = createToken({ id: result.id, email: result.email })
            res.status(201).json({
              token: token,
              data: {
                id: result.id,
                name: result.name,
                role: result.role,
                userLocation: result.userLocation,
                userLocationId: result.userLocationId,
                shop_name: result.shop_name
              },
              msg: 'Login Success'
            })
          }
        }
      })
      .catch(next)
  }

  static googleSign(req, res, next) {
    let payload
    let data
    client
      .verifyIdToken({
        idToken: req.body.idToken,
        audience: process.env.CLIENT_ID
      })
      .then(ticket => {
        payload = ticket.getPayload()
        data = {
          name: payload.name,
          email: payload.email,
          password: process.env.DEFAULT_PASS
        }
        return User.findOne({ where: { email: payload.email } })
      })
      .then(result => {
        if (result) {
          const token = sign({ id: result.id, email: result.email })
          res.status(200).json({
            id: result.id,
            token: token
          })
        } else {
          return User.create(data)
        }
      })
      .then(data => {
        const token = sign({ id: data.id, email: data.email })
        res.status(200).json({
          result: data,
          token: token
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static getUserInfo(req, res, next) {
    const id = req.loggedIn.id
    User.findOne({
      where: { id: id }
    })
      .then(result => {
        const user = {
          id: result.id,
          name: result.name,
          role: result.role,
          userLocation: result.userLocation,
          userLocationId: result.userLocationId,
          shop_name: result.shop_name
        }
        res.status(200).json(user)
      })
      .catch(next)
  }

  static addShop(req, res, next) {
    const shop = {
      role: 'premium',
      shop_name: req.body.shop_name
    }
    User.update(shop, { where: { id: req.loggedIn.id } })
      .then(result => {
        console.log(result)
        res.status(200).json({
          msg: 'Shop created'
        })
      })
      .catch(next)
  }
}

module.exports = UserController
