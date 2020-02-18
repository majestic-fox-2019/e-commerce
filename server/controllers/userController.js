const createError = require('http-errors');
const { User } = require('../database/models');
const { signToken } = require('../helpers/jwt');
const { comparePassword } = require('../helpers/bcrypt');

class UserController {
  // register user
  static register(req, res, next) {
    const { name, email, password, role } = req.body;
    User
      .create({
        name,
        email,
        password,
        role
      })
      .then((result) => {
        const access_token = signToken({
          email: result.email
        })
        const payload = {
          name: result.name,
          access_token
        }
        res.status(201);
        res.json(payload);
      }).catch((err) => {

      });
  }
  // login
  static login(req, res, next) {
    const { email, password } = req.body;
    User
      .findOne({
        where: {
          email
        }
      })
      .then((result) => {
        if (result) {
          if (comparePassword(password, result.password)) {
            const access_token = signToken({
              email: result.email
            });
            const payload = {
              name: result.name,
              access_token
            }
            res.status(200);
            res.json(payload);
          }
          else {
            next(createError(406, "email or password is wrong"));
          }
        }
        else {
          next(createError(406, "email or password is wrong"));
        }
      }).catch((err) => {
        next(err);
      });
  }
}

module.exports = UserController;