const userRoute = require('./routes/userRoute');

const express   = require('express');
const app       = express();

const cors      = require('cors');

require('dotenv').config()

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());


app.use('/users', userRoute);

app.use((err, req, res, next) => {
    if (err.message.length > 0) {
        res.status(400).json({error: err.message});
    }else{
        res.status(500).json(err);
    }
});

module.exports = app;