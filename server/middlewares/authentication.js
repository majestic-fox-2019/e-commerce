const jwt = require("jsonwebtoken")
const User = require("../models").User
function authentication(req, res, next) {
    if (req.headers.hasOwnProperty("token")) {
        const token = req.headers.token
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            req.payload = payload
            User.findOne({ where: { id: req.payload.id } })
                .then(data => {
                    if (data) {
                        // throw ({code: 401, message: ""})
                        next()
                    } else {
                        throw ({ code: 404, message: "User not found" })
                    }
                })
                .catch(err => {
                    throw ({ code: 404, message: err.message })
                })
            // next()
        } catch (error) {
            next({ code: 401, message: error.message || "Failed to authenticate" })
        }
    }
    else {
        next({ code: 400, message: "please login first" })
    }
}

module.exports = authentication