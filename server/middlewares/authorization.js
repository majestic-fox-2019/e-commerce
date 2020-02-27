const {Product} = require('../models');
function authorization(req, res, next){
    Product
        .findOne({
            where: {
                id: Number(req.params.id)
            }
        })
        .then(idUser => {
            if (idUser === req.user.id) {
                next();
            }else{
                throw {
                    statusCode: 403,
                    message: "You are not authorized to do the action!"
                }
            }
        })
        .catch(err => {
            next(err);
        })
}

module.exports = authorization