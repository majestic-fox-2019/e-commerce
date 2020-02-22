const {verify} = require('../helper/jwt')
module.exports = (req,res,next)=>{
  if(req.headers.token){
    let obj = verify(req.headers.token)
    if(obj.role == 'admin'){
      next()
    }else{
      throw {
        status: 403,
        message: `don't have access`
      }  
    }
  }else{
    throw {
      status: 400,
      message: `invalid token`
    }
  }
}