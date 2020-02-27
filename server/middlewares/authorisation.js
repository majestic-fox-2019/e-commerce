const Product = require('../models').Product
const User = require('../models').User
const Cart = require('../models').Cart
function authorisationRole(req, res, next) {
  console.log("masuk authoooo")
  console.log(req.user)
  let user
  User.findOne({where:{id:req.user}})
  .then(data => {
    user = data
    console.log(user.role, "<<<<<<")
    if(user.role == "admin") {
      next()
    } else {
      console.log("masuk else", "<<,,")
      next({code: 401, message: "user not allowed to do this task"})
    }
  })
  .catch(err => {
    console.log("masuk catchhhhh", err)
    next({code: 401, message: "user not allowed to do this task"})
  })
}



module.exports = {authorisationRole}