const express   = require('express');
const router  = express.Router();

const ProductController = require('../controllers/ProductController');

router.get('/:CategoryId', ProductController.list);
router.post('/', ProductController.add);
router.put('/:id', ProductController.edit);
router.delete('/:id', ProductController.delete);

module.exports = router;