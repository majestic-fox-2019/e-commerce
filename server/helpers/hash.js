const bcrypt = require('bcrypt');

function hash(plainText, saltRounds = 10) {
    return bcrypt.hashSync(plainText, saltRounds);
}

function compare(plainText, hashedText){
    return bcrypt.compareSync(plainText, hashedText); 
}

module.exports = {
    hash, compare
}