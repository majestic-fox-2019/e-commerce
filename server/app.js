const userRoute = require('./routes/userRoute');

const express   = require('express');
const app       = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/users', userRoute);

app.use((err, res, req, next) => {
    res.status(500).json(err);
});

module.exports = app;