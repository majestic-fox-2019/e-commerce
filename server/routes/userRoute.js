const express = require('express');
const router  = express.Router();

const UserControllers = require('../controllers/UserController');


router.post('/register', (req, res, next) => {

});

router.post('/login', UserControllers.login);

module.exports = router;