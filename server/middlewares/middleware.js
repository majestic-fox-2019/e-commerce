const { User } = require('../models')
const helper = require('../helpers/helper')

exports.verifyToken = function(req, res, next){
  try{
    if(req.headers.bearer){
      let userToken = helper.authVerify(req.headers.bearer)
      if(userToken){
        User.findOne({ where: { id : userToken.id } })
        .then(user => {
          let userData = {
            name: user.name,
            email: user.email,
            role: user.role
          }
          req.user = userData
          next()
        })
        .catch(err => {
          next(err)
        })
      }
    }else{
      next({
        statusCode: 402,
        message: "Bearer is invalid"
      })
    }
  }
  catch(err){
    next(err)
  }
}

exports.onlySuperadmin = function(req, res, next){
  if(req.user.role === "superadmin"){
    next()
  }else{
    next({
      statusCode: 403,
      message: "You don't access"
    })
  }
}

exports.allAdmin = function(req, res, next){
  if(req.user.role === "superadmin" || req.user.role === 'admin'){
    next()
  }else{
    next({
      statusCode: 403,
      message: "You don't access"
    })
  }
}

exports.authorForUser = function(req, res, next){
  const id_user = req.params.id
  User.findOne({
    where: {
      id: id_user,
    }
  })
  .then(result => {
    if(result){
      if(result.role === req.user.role){
        next()
      }else{
        throw {
          statusCode: 402,
          message: "No access"
        }
      }
    }else{
      throw {
        statusCode: 401,
        message: "User not found"
      }
    }
  })
  .catch(err => {
    next(err)
  })
}