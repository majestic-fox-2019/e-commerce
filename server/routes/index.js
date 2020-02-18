const express = require('express');
const router = express.Router();
const usersRouter = require('./users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Home");
});

router.use('/users', usersRouter);

module.exports = router;
