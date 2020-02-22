if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')
const index = require('./routes/index')
const errorHanding = require('./middlewares/errorHandling')

app
    .use(cors())
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use('/', index)
    .use(errorHanding)

app.listen(PORT, () => console.log(`Server runnin on PORT ${PORT}`))

// module.exports = app