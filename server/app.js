"use strict"

require('dotenv').config()
const express = require("express")
const app = express()
const routes = require("./routes")
const cors = require("cors")
const errorHandler = require("./middlewares/errorHandler")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())
app.use("/", routes)
app.use(errorHandler)

module.exports = app