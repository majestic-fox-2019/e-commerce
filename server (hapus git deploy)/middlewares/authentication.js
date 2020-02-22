const {verify} = require('../helper/jwt')
module.exports = (req,res,next)=>{
  if(req.headers.token){
    req.user = verify(req.headers.token)
    next()
  }else{
    throw {
      status: 400,
      message: `invalid token`
    }
  }
}