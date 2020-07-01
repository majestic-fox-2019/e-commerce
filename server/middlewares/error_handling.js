"use strict";

function showError(err, req, res, next) {
  // console.log('masukk?', err);
  if (err.status) {
    res.status(err.status).json(err.msg);
  } else {
    res.status(404).json(err.errors.message);
  }
}

module.exports = showError;