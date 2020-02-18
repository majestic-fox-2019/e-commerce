const { User } = require('../models/index')
const jwt = require('../helpers/jwt')

module.exports = class {
  static register(req, res, next) {
    // console.log('masuk controller atas')

    let { name, email, password, role } = req.body
    // console.log('ini dr controller register', req.body)

    User.create({
      name,
      email,
      password,
      role
    })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        console.log('langsung masuk error register controller')
        err.status(400)
        next(err)
      })
  }

  static login(req, res, next) {
    let { email, password } = req.body
    User.findOne({
      where: {
        email,
        password
      }
    })
      .then(result => {
        let userLogin = {
          id: result.id,
          email: result.email
        }
        let token = jwt.generateToken(userLogin)
        res.status(200).json({
          email: userLogin.email,
          token: token
        })
      })
      .catch(err => {
        err.status(404)
        next(err)
      })
  }
}
