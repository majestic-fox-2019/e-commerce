const createError = require('http-errors');

const { User } = require('../database/models');
const { signToken } = require('../helpers/jwt');
const { comparePassword } = require('../helpers/bcrypt');

const composePayload = (user) => {
  const access_token = signToken({
    email: user.email
  });
  const newUser = {
    name: user.name,
    image_url: user.image_url,
    role: user.role
  }
  return {
    access_token,
    user: newUser
  }
}

class UserController {
  // register
  static async register(req, res, next) {
    const { name, email, password, role } = req.body;
    try {
      const user = await User.create({
        name, email, password, role
      });

      // then
      const payload = composePayload(user);
      res.status(201);
      res.json(payload);
    } catch (err) {
      next(err);
    }
  }
  // login
  static async login(req, res, next) {
    const { email = "", password = "" } = req.body;
    try {
      const user = await User.findOne({
        where: {
          email
        }
      });
      // then
      if (!user) {
        next(createError(401, "Email or Password is wrong!"));
      } else {
        const isValid = comparePassword(password, user.password);
        if (!isValid) {
          next(createError(401, "Email or Password is wrong!"));
        } else {
          const payload = composePayload(user);
          res.status(200);
          res.json(payload);
        }
      }
    } catch (err) {
      next(err);
    }
  }
  // static login(req, res, next) {
  //   const {email = "", password = ""} = req.body;
  //   User.findOne({
  //     where: {
  //       email
  //     }
  //   })
  //   .then((result) => {
  //     if (!result) {
  //       next(createError(401, "Email or Password is wrong!"));
  //     }
  //     else {
  //       const isValid = comparePassword(password, result.password);
  //       if (!isValid) {
  //         next(createError(401, "Email or Password is wrong!"));
  //       }
  //       else {
  //         res.json(result);
  //       }
  //     }
  //   }).catch((err) => {
  //     next(err);
  //   });
  // }
}

module.exports = UserController;