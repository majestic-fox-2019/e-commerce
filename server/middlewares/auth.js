const { User } = require('../models/index')
const jwt = require('../helpers/jwt')

module.exports = {
  authentication: (req, res, next) => {
    try {
      const payload = jwt.verifyToken(req.headers.token)
      console.log(payload)

      User.findOne({
        where: {
          id: payload.id
        }
      })
        .then(result => {
          if (result) {
            res.user = result
            next()
          } else {
            res.status(401).json({
              message: 'You need to login first'
            })
          }
        })
        .catch(err => {
          next(err)
        })
    } catch (err) {
      console.log('error di auth authentication')
      res.status(401).json({
        message: 'need To LOGIn'
      })
    }
  },
  adminOnly: (req, res, next) => {
    try {
      if (res.user.role === 'admin') {
        next()
      } else {
        res.status(401).json({
          message: 'You need to login as an admin'
        })
      }
    } catch (error) {
      error.status = 400
      next(error)
    }
  }
}
