const bcrypt = require('bcrypt')

function hashing(password) {
  let salt = 10
  return bcrypt.hashSync(password, salt)
}

function compare(someOtherPlaintextPassword, hash) {
  return bcrypt.compareSync(someOtherPlaintextPassword, hash);
}

module.exports = {
  hashing,
  compare
};
