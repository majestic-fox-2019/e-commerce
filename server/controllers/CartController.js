const { Cart, User, Product, Category, Transaction } = require('../models')

class CartController {
  static addItem(req, res){
    const dataBeli = {
      UserId: Number(req.body.UserId),
      ProductId: Number(req.body.ProductId),
      quantity: 1
    }
    let status
    Cart.findOne({
      where: {
        ProductId: dataBeli.ProductId
      }
    })
    .then(findcart => {
      if(findcart){
        status = 200
        dataBeli.quantity += findcart.quantity
        return findcart.update(dataBeli, { returning : true })
      }else{
        status = 201
        return Cart.create(dataBeli)
      }
    })
    .then(cart => {
      if(status === 200){
        res.status(200).json({
          code: 201,
          message: "Add item to cart successfull",
          payload: cart
        })
      }else{
        res.status(201).json({
          code: 201,
          message: "Add item to cart successfull",
          payload: cart
        })
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static getAllCart(req, res, next){
    User.findOne({
      where: {
        id : Number(req.params.id)
      },
      attributes: { exclude: ['password'] },
      include: [{
        model : Cart,
        order: [['id', 'ASC']],
        include: [{
          model : Product,
          include: [{
            model : Category
          }]
        }]
      }],
    })
    .then(userCart => {
      let totalPrice = 0
      userCart.Carts.map(el => {
        totalPrice += el.Product.price * el.quantity
      })
      res.status(200).json({
        code: 200,
        message: "Get all cart successfull",
        total: totalPrice,
        payload: userCart
      })
    })
    .catch(err => {
      next(err)
    })
  }

  static minusCart(req, res, next){
    const id_cart = Number(req.params.id)
    Cart.findOne({
      where: { id: id_cart }
    })
    .then(cart => {
      if(cart){
        if(cart.quantity > 1){
          let obj = {
            quantity : cart.quantity -= 1
          }
          return cart.update(obj, { returning : true })
        }else{
          throw{
            error: 401,
            message: 'Quantity minimal 1'
          }
        }
      }else{
        throw{
          error: 404,
          message: 'Cart product not found'
        }
      }
    })
    .then(result => {
      res.status(200).json({
        code: 200,
        message: "Update quantity successfull",
        payload: result
      })
    })
    .catch(err => {
      next(err)
    })
  }

  static plusCart(req, res, next){
    const id_cart = Number(req.params.id)
    Cart.findOne({
      where: { id: id_cart }
    })
    .then(cart => {
      if(cart){
        if(cart.quantity > 0){
          let obj = {
            quantity : cart.quantity += 1
          }
          return cart.update(obj, { returning : true })
        }else{
          throw{
            error: 401,
            message: 'Quantity sudah 0'
          }
        }
      }else{
        throw{
          error: 404,
          message: 'Cart product not found'
        }
      }
    })
    .then(result => {
      res.status(200).json({
        code: 200,
        message: "Update quantity successfull",
        payload: result
      })
    })
    .catch(err => {
      next(err)
    })
  }

  static doTransaction(req, res, next){
    const user_id = Number(req.params.id)
    let codetransaction
    User.findOne({
      where: { id : user_id }
    })
    .then(user => {
      if(user){
        return Cart.findAll({
          where: { UserId: user_id },
          include: [Product]
        })
      }else{
        throw{
          error: 404,
          message: 'User not found'
        }
      }
    })
    .then(cart => {
      let messageError = {}
      cart.map(el => {
        if(el.quantity > el.Product.stock){
          messageError[el.Product.name] = {
            sisa_stock: el.Product.stock
          }
        }
      })
      if(Object.keys(messageError).length > 0){
        throw {
          code: 400,
          message: messageError
        }
      }else{
        let updateStock = []
        cart.map(el => {
          updateStock.push(el.Product.update({
            stock: el.Product.stock - el.quantity,
          }))
        })
        return Promise.all(updateStock)
      }
    })
    .then(result => {
      return Transaction.findAll()
    })
    .then(transactions => {
      let id_transaction = transactions.length
      let dateObj = new Date();
      let timeLocal = dateObj.toLocaleDateString('id-ID')
      let timeSplit = ''
      for(let i = 0; i < timeLocal.length; i++){
        if(timeLocal[i] !== '/'){
          timeSplit += timeLocal[i]
        }
      }
      let codeTransaction = (id_transaction+=1) + timeSplit
      let dataTransaction = {
        code_transaction: Number(codeTransaction),
        name: req.body.name,
        address: req.body.address,
        products: req.body.products,
        total_price: req.body.total_price
      }
      return Transaction.create(dataTransaction)
    })
    .then(result => {
      codetransaction = result.code_transaction
      return Cart.destroy({
        where: {
          UserId: user_id
        },
        truncate: true
      })
    })
    .then(() => {
      res.status(201).json({
        code: 201,
        message: "Transaction berhasil di tambah dan cart berhasil di delete",
        payload: {
          code_transaction: codetransaction
        }
      })
    })
    .catch(err => {
      next(err)
    })
  }

  static deleteCart(req, res){
    const id_cart = Number(req.params.id)
    Cart.findOne({
      where: { id: id_cart }
    })
    .then(cart => {
      if(cart){
        return cart.destroy()
      }else{
        throw{
          statusCode: 404,
          message: "Cart product not found"
        }
      }
    })
    .then(() => {
      res.status(200).json({
        code: 200,
        message: 'Delete cart product successfull'
      })
    })
    .catch(err => {
      res.send(err)
    })
  }

  static getAllTransaction(req, res, next){
    const user_id = Number(req.params.id)
    User.findOne({
      where: { id: user_id }
    })
    .then(user => {
      if(user){
        return Transaction.findAll({
          where: { name : user.name }
        })
      }else{
        throw{
          error: 404,
          message: "User not found"
        }
      }
    })
    .then(transactions => {
      res.status(200).json({
        code: 200,
        message: 'Get transaction successfull',
        payload: transactions
      })
    })
    .catch(err => {
      console.log('masuk sini')
      next(err)
    })
  }

  static deleteTransaction(req, res, next){
    const id_transaction = Number(req.params.id)
    Transaction.findOne({
      where: { id: id_transaction }
    })
    .then(transaction => {
      if(transaction){
        return transactions.destroy()
      }else{
        throw{
          error: 404,
          message: "Transaction not found"
        }
      }
    })
    .then(() => {
      res.status(200).json({
        code: 200,
        message: "Transaction deleted successfull"
      })
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = CartController