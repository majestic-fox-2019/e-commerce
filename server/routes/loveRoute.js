const express = require('express');
const router  = express.Router();

const LoveControllers = require('../controllers/LoveController');

router.post('/', LoveControllers.addToLove);
router.get('/:UserId/getTotal', LoveControllers.getTotalByUser);
router.get('/:UserId', LoveControllers.listLoveByUser);

module.exports = router;