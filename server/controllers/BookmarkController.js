"use strict"
const {Bookmark} = require('../models');
class BookmarkController {
    static addToBookmark(req, res, next) {
        const {UserId, ProductId} = req.body;
        Bookmark
          .create({UserId, ProductId})
          .then(() => {
              res.status(201).json("Sucess add product to Bookmark list");
          })
          .catch(err => {
              next(err);
          });
    }
}

module.exports = BookmarkController;