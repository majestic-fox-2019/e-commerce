module.exports = function(err, req, res, next) {
  if (err.name == 'SequelizeValidationError') {
    let errors = []
    err.errors.forEach((error) => {
      errors.push(error.message)
    })
    res.status(400).json({
      msg: errors
    })
  } else if (err.name == 'SequelizeDatabaseError') {
    res.status(400).json({
      msg: `Wrong category format, value either 'Desktop', 'Laptop', 'Keyboard', 'Monitor', 'Mouse'`
    })
  } else if (err.name == 'SequelizeUniqueConstraintError') {
    res.status(400).json({
      msg: err.errors[0].message
    })
  } else if (err.name == 'JsonWebTokenError') {
    res.status(401).json({
      msg: 'Invalid access token'
    })
  } else if (err.message == 'Login error') {
    res.status(err.status).json({
      msg: 'Invalid email or password'
    })
  } else if (err.status >= 300 && err.status < 500) {
    res.status(err.status).json({
      msg: err.message
    })
  } else {
    console.log(err)
    res.status(500).json(err)
  }
}
