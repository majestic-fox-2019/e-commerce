module.exports = function (err, req, res, next) {
  if(err.name === "SequelizeDatabaseError"){
    res.status(500).json( { error: err })
  }else{
    
    let result =  null
    if(err.name === "SequelizeValidationError"){
      result = {}
      for(let i = 0; i < err.errors.length; i++){
        result[err.errors[i].path] = err.errors[i].message
      }
    }
    
    res.status(err.statusCode || 400).json(result || err.message)
  }
}
