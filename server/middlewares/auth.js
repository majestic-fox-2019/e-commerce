const createError = require('http-errors');
const { verifyToken } = require('../helpers/jwt');
const { User } = require('../database/models');

module.exports = {
  async authentication(req, res, next) {
    const { access_token } = req.headers;
    try {
      const payload = verifyToken(access_token);
      const user = await User.findOne({
        where: {
          email: payload.email
        }
      });
      // then
      if (!user) {
        next(createError(401));
      }
      else {
        req.headers.user = user;
        next();
      }
    } catch (err) {
      next(err);
    }
  },
  isAdmin(req, res, next) {
    const { role } = req.headers.user;
    if (role !== "admin") {
      next(createError(403));
    }
    else {
      next();
    }
  },
  isCustomer(req, res, next) {
    const { role } = req.headers.user;
    if (role !== "customer") {
      next(createError(403));
    }
    else {
      next();
    }
  }
};
