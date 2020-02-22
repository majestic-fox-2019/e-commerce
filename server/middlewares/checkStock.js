const { Product } = require('../models')
module.exports = (req, res, next) => {
  let errors = []
  let orderItems = []
  let queries = []
  let { items } = req.body

  items.forEach((item) => {
    queries.push(
      Product.findOne({
        where: {
          id: item.id
        }
      })
    )
  })

  Promise.all(queries)
    .then((products) => {
      items.forEach((item) => {
        let orderedProduct = products.find((product) => product.id == item.id)
        if (orderedProduct.stock < item.stock) {
          errors.push(orderedProduct)
        } else {
          let calibratedStock = orderedProduct.stock - item.quantity
          orderItems.push({
            id: orderedProduct.id,
            stock: calibratedStock
          })
        }
      })
      if (errors.length > 0) {
        let error = {
          status: 400,
          name: 'Insufficient Stock',
          msg: errors
        }
        next(error)
      } else {
        req.orderItems = orderItems
        next()
      }
    })
    .catch((err) => {
      next(err)
    })
}

// module.exports = checkStock
