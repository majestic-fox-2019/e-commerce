const express = require('express');
const router  = express.Router();

const BookmarkControllers = require('../controllers/BookmarkController');

router.post('/', BookmarkControllers.addToBookmark);
router.get('/:UserId/getTotal', BookmarkControllers.getTotalByUser);
router.get('/:UserId', BookmarkControllers.listBookmarkByUser);

module.exports = router;