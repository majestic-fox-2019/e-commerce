const express = require('express');
const router  = express.Router();

const BookmarkControllers = require('../controllers/BookmarkController');

router.post('/', BookmarkControllers.addToBookmark);

module.exports = router;