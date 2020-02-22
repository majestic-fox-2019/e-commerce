
const { Product, User, Category } = require('../models')

class controllerProducts {

  static productsAll(req, res, next) {
    Product
      .findAll({
        include: [
          { model: User },
          { model: Category }
        ]
      })
      .then(resultProduct => {
        res.status(200).json(resultProduct)
      })
      .catch(err => {
        console.log(err)
      })
  }

  static createProduct(req, res, next) {
    let { name, image_url, price, stock, CategoryId } = req.body
    Product
      .create(
        {
          name,
          image_url,
          price,
          stock,
          CategoryId,
          UserId: req.user.id

        }
      )
      .then(resultcreate => {
        res.status(200).json(resultcreate)
      })
      .catch(err => {
        // console.log(err)
        res.status(500)
      })
  }

  static updateProduct(req, res, next) {
    let id = req.params.id
    let { name, image_url, price, stock, CategoryId } = req.body
    Product
      .update({ name, image_url, price, stock, CategoryId }, { where: { id: id }, returning: true })
      .then(result => {
        res.status(200).json(result[1][0])
      })
      .catch(err => {
        res.status(500)
      })
  }

  static deleteProduct(req, res, next) {
    let id = req.params.id
    let isi = null
    Product
      .findOne({ where: { id: id } })
      .then(result => {
        isi = result
        return Product.destroy({ where: { id: id }, returning: true })
      })
      .then(resultDestroy => {
        if (resultDestroy > 0) {
          res.status(200).json(isi)
        } else {
          let err = {
            statusCode: '404',
            message: 'not found'
          }
          next(err)
        }
      })
      .catch(err => {
        res.status(500)
      })

  }


}

module.exports = controllerProducts