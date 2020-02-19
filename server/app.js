if (process.env.NODE_ENV == "development" || process.env.NODE_ENV == "test") {
    require("dotenv").config()
}
const express = require("express")
const app = express()
const cors = require("cors")
const PORT = process.env.PORT || 3000
const routes = require("./routes")
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", routes)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`listening to PORT ${PORT} in environment ${process.env.NODE_ENV}`)
})

module.exports = app