module.exports = (err, req, res, next) => {
  let sendError, status
  if ((err.name = 'SequelizeValidationError')) {
    if (!err.status) {
      status = 400
    }
    // error = []
    // err.errors.forEach(err => {
    //   error.push(err.message)
    // })
    sendError = err
  }
  if (!status) {
    status = 500
  }
  res.status(status).json(sendError)
}
