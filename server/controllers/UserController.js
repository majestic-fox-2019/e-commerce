const User              = require('../models').User;
const {compare}         = require('../helpers/hash');
const {generateToken}   = require('../helpers/webtoken');
class UserController {
    static login(req, res, next) {
        const {email, password} = req.body;
        User
            .findOne({
                where: {email}
            })
            .then(user => {
                if (user && compare(password, user.password)) {
                    let token = generateToken({email});
                    res.status(200).json({token})
                }else{
                    throw{
                        statusCode: 404,
                        message: "Invalid username or password"
                    }
                }
            })
            .catch(err => {
                next(err);
            })
    }

    static register(req, res, next) {
        const {email, password} = req.body;
        User
            .create({email, password})
            .then((result) => {
                res.status(201).json(result);
            }).catch((err) => {
                next(err);
            });        
    }
}

module.exports = UserController;