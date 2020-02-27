module.exports = (err, req, res, next) => {
    if (err.name == 'SequelizeDatabaseError') {
        res.status(500).json({ errors: 'Server currently unable to handle this request' })
    } else {
        if (err.name == "SequelizeValidationError") {
            let errorMsg = {}
            for (let i = 0; i < err.errors.length; i++) {
                errorMsg[err.errors[i].path] = err.errors[i].message
            }
            err.message = errorMsg
        }

        res
            .status(err.statusCode || 400)
            .json({ errors: err.message })
    }
}