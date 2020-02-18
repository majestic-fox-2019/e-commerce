const jwt = require('jsonwebtoken');

module.exports = {
  signToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "6h"
    });
  },
  verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
};
