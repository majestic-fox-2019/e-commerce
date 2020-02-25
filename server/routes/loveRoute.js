const express = require('express');
const router  = express.Router();

const LoveControllers = require('../controllers/LoveController');

router.post('/', LoveControllers.addToLove);

module.exports = router;