const UserControllers = require('./controllers/UserController');

const authenticated     = require('./middlewares/authentication');
const error_handling    = require('./middlewares/error_handling');

const userRoute         = require('./routes/userRoute');
const productRoute      = require('./routes/productRoute');
const transactionRoute  = require('./routes/transactionRoute');
const loveRoute         = require('./routes/loveRoute');
const bookmarkRoute     = require('./routes/bookmarkRoute');

const express   = require('express');
const app       = express();

const cors      = require('cors');

require('dotenv').config()

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.post('/users/register', UserControllers.register);
app.post('/users/login', UserControllers.login);

app.use(authenticated);
app.use('/users', userRoute);
app.use('/products', productRoute);
app.use('/transactions', transactionRoute);
app.use('/loves', loveRoute);
app.use('/bookmarks', bookmarkRoute);

app.use(error_handling);

module.exports = app;