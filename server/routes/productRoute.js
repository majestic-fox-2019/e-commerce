const express   = require('express');
const router  = express.Router();

const ProductController = require('../controllers/ProductController');

router.get('/', ProductController.list);
router.post('/', ProductController.add);
router.put('/', ProductController.edit);
router.delete('/', ProductController.delete);

module.exports = router;