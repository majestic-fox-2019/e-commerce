const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class UserController {
    static register(req, res, next) {
        let objInput = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: 'user'
        };
        User.create(objInput)
            .then(result => {
                var restoken = jwt.sign(
                    {
                        email: result.email,
                        id: result.id
                    },
                    "wiesoo"
                );
                res.status(200).json({ token: restoken, role: result.role });
            })
            .catch(err => {
                res.status(404).json(err.message);
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
                    console.log
                    res.status(200).json({ token: restoken, role: result.role });
                } else {
                    throw "password is false";
                }
            })
            .catch(err => {
                res.status(400).json(err.message);
            });
    }
}
module.exports = UserController;
