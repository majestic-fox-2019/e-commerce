const { ChartProduct, Product } = require('../models/index')

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
        // console.log(result, 'in log yang ku konsole')
      })
      .catch(err => {
        err.status = 400
        next(err)
      })
  }

  static getUserChart(req, res, next) {
    // console.log(res.user)
    console.log(req.body, 'this is what that i am start')

    ChartProduct.findAll({
      where: {
        UserId: res.user.id,
        status: req.body.status
      },
      include: ['Product']
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

  static changeStatus(req, res, next) {
    // console.log(req.body.status)
    // console.log('lorem ipsum')
    let dataResult = null
    let stock = null
    let productId = null
    // console.log(req.params.productId)
    console.log(req.params.productId, 'ini params id')
    ChartProduct.findOne({
      where: {
        id: req.params.productId
      }
    })
      .then(result => {
        productId = result.ProductId
        return Product.findOne({
          where: {
            id: productId
          }
        })
      })
      .then(data => {
        console.log('ini then1 jumlah stocknya adalah', data)
        stock = data.stock
        if (data.stock >= 1) {
          return ChartProduct.update(req.body, {
            where: {
              id: req.params.productId
            },
            plain: true,
            returning: true
          })
        }
      })
      .then(result => {
        dataResult = result[1].dataValues
        // console.log(result)
        // res.status(200).json(dataResult)
        let newStock = stock - dataResult.quantity
        return Product.update(
          {
            stock: newStock
          },
          {
            where: {
              id: productId
            },
            plain: true,
            returning: true
          }
        )
      })
      .then(data => {
        res.status(200).json(dataResult)
      })
      .catch(err => {
        console.log(err)

        res.status(400).json(err)
      })
      .catch(err => {})
  }

  static getProdukTerjual(req, res, next) {}
}
