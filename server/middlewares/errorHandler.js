"use strict"
module.exports = (err, req, res, next) => {
    console.log(err, "===========================================================");
    if (err.status && err.msg) {
        res.status(err.status).json(err.msg)
    } else if (err.status && err.message) {
        res.status(err.status).json({ message: err.message })
    } else if (err.name === "JsonWebTokenError") {
        res.status(401).json({ message: "Unauthorized Invalid Token" })
    } else if (err.name === "CastError") {
        res.status(404).json("Data Not Found")
    } else if (err.name === "SequelizeValidationError") {
        res.status(400).json({ message: err.errors[0].message })
    } else {
        res.status(500).json("Internal Server Error")
    }
}