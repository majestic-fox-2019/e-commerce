const bcrypt = require("bcrypt")
function matchPassword(passIn, passDb) {
    const match = bcrypt.compareSync(passIn, passDb)
    return match
}

module.exports = matchPassword