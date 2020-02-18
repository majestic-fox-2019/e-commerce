const User      = require('../models').User;
const {compare} = require('../helpers/hash');
class UserController {
    static login(req, res, next) {
        const {email, password} = req.body;
        User
            .findOne({
                where: {email}
            })
            .then(user => {
                if (user && compare(password, user.password)) {
                    let token = "asldksal";
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

        res.status(200).json({token: "asdsatest", email});
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