const router = require('express').Router();
const productCon = require('../controllers/productController');
const Product = require('../models/').Product;
const authenticator = require('../middlewares/authorizer');

const gcsUpload = require('gcs-upload');

const upload = gcsUpload({
  limits: {
    fileSize: 1e6 // in bytes
  },
  gcsConfig: {
    keyFilename: './jovipetra-bd211966abec.json',
    bucketName: 'miniwp-images-jovi'
  }
})

function authorizer(req,res,next){
  Product.findByPk(req.params.id)
  .then(response=>{
    if(!response){
      next('product-not-found')
      return
    }

    if(req.user.role==='admin'){
      next()
    } else {
      res.status(401).json({msg : 'Unauthorized'})
    }
  })
}

function postingAuth(req,res,next){
  if(req.user.role==='admin'){
    next()
  } else {
    next('unauthorized')
  }
}

router.use(authenticator)
router.get('/', productCon.findAll)
router.get('/:id', productCon.findOne)
router.post('/', postingAuth, upload.single('file'), productCon.create)
router.put('/:id', authorizer, productCon.edit)
router.delete('/:id', authorizer, upload.single('file'), productCon.delete)

module.exports = router