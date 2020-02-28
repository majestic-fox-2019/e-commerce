const router = require('express').Router();
const cartCon = require('../controllers/cartController');
const Product = require('../models/').Product;
const authenticator = require('../middlewares/authorizer');

function authorizer(req,res,next){
    if(req.user.role==='admin'){
      next()
    } else {
      res.status(401).json({msg : 'Unauthorized'})
    }
}

// /

router.use(authenticator)
router.get('/', cartCon.findAll)
router.post('/', cartCon.create)
router.put('/:id', cartCon.checkout)
// router.get('/:id', cartCon.findOne)
router.use(authorizer)
router.get('/transactions', cartCon.transactions)
router.delete('/:id', cartCon.delete)

// ---- TRANSACTIONS --- //

module.exports = router