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
}
