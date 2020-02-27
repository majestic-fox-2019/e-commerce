const { ChartMall } = require('../models/index')

module.exports = class {
  static addChart(req, res, next) {
    ChartMall.create({
      UserId: res.user.id,
      MallId: req.params.mallId,
      status: 'start',
      quantity: req.body.quantity
    })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        err.status = 400
        next(err)
      })
  }

  static changeStatus(req, res, next) {
    ChartMall.update(
      {
        status: req.body.status
      },
      {
        where: {
          MallId: req.params.mallId
        },
        plain: true,
        returning: true
      }
    )
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {})
  }

  static getAll(req, res, next) {
    ChartMall.findAll({
      include: ['Mall', 'User']
    })
      .then(result => {
        // console.log(result, 'in loh ')
        res.status(200).json(result)
      })
      .catch(err => {
        err.status = 400
        console.log(err)
        next(err)
      })
  }

  static getUserChart(req, res, next) {
    // console.log(res.user)
    console.log('this is in mall controllers')

    ChartMall.findAll({
      where: {
        UserId: res.user.id,
        status: req.body.status
      },
      include: ['Mall']
    })
      .then(result => {
        // console.log(result, 'in loh ')

        res.status(200).json(result)
      })
      .catch(err => {
        err.status = 400
        console.log(err)
        next(err)
      })
  }
}
