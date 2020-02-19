const jwt = require("jsonwebtoken")
function authentication(req, res, next) {
    if (req.headers.hasOwnProperty("token")) {
        const token = req.headers.token
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            req.payload = payload
            next()
        } catch (error) {
            next({ code: 401, message: "Failed to authenticate" })
        }
    } else {
        next({ code: 400, message: "please login first" })
    }
}

module.exports = authentication