const Product = require('../models').Product
const User = require('../models').User
function authorisationRole(req, res, next) {
  let user
  User.findOne({where:{id:req.user}})
  .then(data => {
    user = data
    if(user.role == "admin") {
      next()
    } else {
      next({code: 401, message: "user not allowed to do this task"})
    }
  })
  .catch(err => {
    next({code: 401, message: "user not allowed to do this task"})
  })
}

function authorisationProduct(req, res, next) {
  let product 
  let user
  User.findOne({where:{id:req.user}})
  .then(data => {
    user = data
    return Product.findOne({where:{UserId:user.id}})
  })
  .then(product => {
    if(product) {
      next()
    } else {
      next({code: 401, message: "user not allowed to do this task"})
      console.log("masuk else")
    }
  })
  .catch(err => {
    next({code: 401, message: "user not allowed to do this task"})
    console.log(err)
  })
}

module.exports = {authorisationRole, authorisationProduct}