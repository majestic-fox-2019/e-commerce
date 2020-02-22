const { Banner } = require('../models')
const createError = require('http-errors')
class Controller {
  static create(req, res, next) {
    Banner.create({
      image: req.body.image,
      name: req.body.name
    })
      .then((result) => {
        res.status(201).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }
  static readAll(req, res, next) {
    Banner.findAll()
      .then((result) => {
        res.status(200).json(result)
      })
      .catch((err) => {
        next(err)
      })
  }
  static readOne(req, res, next) {
    Controller.findOne(req.params.id)
      .then((result) => {
        if (!result) {
          let err = createError(404, 'Banner not found')
          next(err)
        } else {
          res.status(200).json(result)
        }
      })
      .catch((err) => {
        next(err)
      })
  }

  static delete(req, res, next) {
    let banner
    Controller.findOne(req.params.id)
      .then((result) => {
        banner = result
        Banner.destroy({
          where: {
            id: req.params.id
          }
        })
      })
      .then(() => {
        res.status(200).json(banner)
      })
      .catch((err) => {
        next(err)
      })
  }

  static findOne(bannerId) {
    return Banner.findOne({
      where: {
        id: bannerId
      }
    })
  }
}

module.exports = Controller
