const userRoute = require('./routes/userRoute');

const express   = require('express');
const app       = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/users', userRoute);

module.exports = app;