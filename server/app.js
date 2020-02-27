require('dotenv').config()

const express = require("express");
const app = express();
var cors = require('cors')
const PORT = 3000;

const route = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

app
	.use(cors())
	.use(express.json())
	.use(express.urlencoded({ extended: true }))
	.use(route)
	.use(errorHandler)

app.listen(PORT, () => {
	console.log(`Listening to PORT ${PORT}`);
});

// module.exports = app;
