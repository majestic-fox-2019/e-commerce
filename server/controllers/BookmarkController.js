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

    static getTotalByUser(req, res, next) {
        Bookmark
            .findAll({
                where: {
                    UserId: req.params.UserId
                }
            })
            .then(bookmarks => {
                res.status(200).json(bookmarks.length);
            })
            .catch(err => {
                next(err);
            });
    }
}

module.exports = BookmarkController;