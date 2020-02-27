const Product = require('../models').Product
const User = require('../models').User
const Cart = require('../models').Cart
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



module.exports = {authorisationRole}