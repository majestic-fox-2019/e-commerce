const {verify} = require('../helper/jwt')
const {User} = require('../models')
module.exports = (req,res,next)=>{
  console.log('eqwew',typeof req.headers.token)
  if(req.headers.token){
    req.user = verify(req.headers.token)
    User.findOne({
      where: {
        email: req.user.email
      }
    })
      .then(found=>{
        if(found) {
          next()
        }else{
          throw {
            status: 401,
            message: `unauthenticated`
          }
        }
      })
  }else{
    throw {
      status: 400,
      message: `invalid token`
    }
  }
}