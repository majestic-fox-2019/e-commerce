const router = require('express').Router();
const user  = require('./userRoutes');
const product  = require('./productRoute');
const cart  = require('./cartRoute');

router.use('/user',user )
router.use('/product',product )
router.use('/cart',cart )

module.exports = router