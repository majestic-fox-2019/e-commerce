const express   = require('express');
const router  = express.Router();

const ProductController = require('../controllers/ProductController');

router.get('/', ProductController.list);
router.post('/:ProductId', ProductController.add);
router.put('/:id', ProductController.edit);
router.delete('/:id', ProductController.delete);

module.exports = router;