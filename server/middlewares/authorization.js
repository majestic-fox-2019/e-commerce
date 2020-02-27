const { Product } = require("../models");
module.exports = (req, res, next) => {
    Product.findOne({
        where: {
            UserId: req.user.id,
            id: req.params.id
        }
    }).then(result => {
        if (result) {
            next();
        } else {
            throw {
                errorStatus: 401,
                message: "unauthorized"
            };
        }
    });
};
