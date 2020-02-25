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
                shop_name: result.shop_name
              },
              msg: 'Login Success'
            })
          }
        }
      })
      .catch(next)
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
