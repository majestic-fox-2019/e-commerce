const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class UserController {
    static register(req, res, next) {
        let objInput = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };
        User.create(objInput)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
                res.status(404);
            });
    }
    static login(req, res, next) {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(result => {
                let compare = bcrypt.compareSync(
                    req.body.password,
                    result.password
                );
                if (compare) {
                    var restoken = jwt.sign(
                        {
                            email: result.email,
                            id: result.id
                        },
                        "wiesoo"
                    );
                    console.log(result.id);
                    res.status(200).json({
                        token: restoken,
                        UserId: result.id
                    });
                } else {
                    throw "password is false";
                }
            })
            .catch(err => {
                res.status(400).json(err);
            });
    }
}
module.exports = UserController;
