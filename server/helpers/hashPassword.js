const bcrypt = require('bcrypt')
const saltRounds = 3

function hash(plainPassword) {
    const hashed = bcrypt.hashSync(plainPassword, saltRounds)
    return hashed
}

module.exports = hash