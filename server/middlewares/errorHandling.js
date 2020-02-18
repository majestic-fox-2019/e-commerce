module.exports = (err, req, res, next) => {
  try {
    let error = new Error
    switch (err.name) {
      case "SequelizeValidationError":
        error.statusCode = 400
        error.message = {}
        err.errors.forEach(er => {
          error.message[er.path] = er.message
        })
        throw error
        break

      case "NotFoundError":
        error.statusCode = 404
        error.message = err.message
        throw error
        break

      case "BadRequestError":
        error.statusCode = 400
        error.message = err.message
        throw error
        break

      default:
        throw error
        break
    }

  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || error)
  }
}