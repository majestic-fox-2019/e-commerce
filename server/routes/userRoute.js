const express   = require('express');
const router  = express.Router();

const UserControllers = require('../controllers/UserController');

router.get('/', UserControllers.list);
router.put('/:id', UserControllers.edit);
router.delete('/:id', UserControllers.delete);

module.exports = router;