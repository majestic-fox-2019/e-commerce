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
router.use(authorizer)
router.get('/', cartCon.findAll)
router.get('/transactions', cartCon.transactions)
router.post('/', cartCon.create)
router.get('/:id', cartCon.findOne)
router.delete('/:id', cartCon.delete)
router.put('/:id', cartCon.checkout)

// ---- TRANSACTIONS --- //

module.exports = router