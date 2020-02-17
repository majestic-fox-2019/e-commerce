const User = require('../models').User;
class UserController {
    static login(req, res, next) {
        const {email, password} = req.body;
        res.status(200).json({token: "asdsatest", email});
        // User
        //     .findOne({email})
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