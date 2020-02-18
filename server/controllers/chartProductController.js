const { ChartProduct } = require('../models/index')

module.exports = class {
  static addChart(req, res, next) {
    ChartProduct.create({
      UserId: res.user.id,
      ProductId: req.params.productId,
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
    ChartProduct.update(
      {
        status: req.body.status
      },
      {
        where: {
          ProductId: req.params.productId
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
