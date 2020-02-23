const bcrypt = require('bcrypt');

module.exports = {
  hashPassword: function(password) {
    const salt = bcrypt.genSaltSync(8);
    const hashed = bcrypt.hashSync(password, salt);
    return hashed;
  },
  comparePassword: function (password, encryptedPassword) {
    const isValid = bcrypt.compareSync(password, encryptedPassword);
    return isValid;
  }
};
