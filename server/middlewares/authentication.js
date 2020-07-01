const jwt = require("jsonwebtoken");
function authentication(req, res, next) {
  try {
    let token = req.headers.token;
    let user = jwt.verify(token, process.env.secret);
    req.user = user;
    next();
  } catch (error) {
    throw {
      status: 404,
      msg: "You don't have access..."
    };
  }
}

module.exports = authentication;
