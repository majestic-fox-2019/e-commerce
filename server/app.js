const authenticated     = require('./middlewares/authentication');
const error_handling    = require('./middlewares/error_handling');

const userRoute         = require('./routes/userRoute');
const productRoute      = require('./routes/productRoute');

const express   = require('express');
const app       = express();

const cors      = require('cors');

require('dotenv').config()

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());


app.use('/users', userRoute);
app.use(authenticated);
app.use('/products', productRoute);

app.use(error_handling);

module.exports = app;