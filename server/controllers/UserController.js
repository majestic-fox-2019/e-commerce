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
        const {email, password, role} = req.body;
        User
            .create({email, password, role})
            .then((result) => {
                res.status(201).json(result);
            }).catch((err) => {
                next(err);
            });        
    }

    static list(req, res, next) {
        User
            .findAll()
            .then(users => {
                res.status(200).json(users);
            })
            .catch(err => {
                next(err);
            });
    }

    static edit(req, res, next) {
        const {email, password, role} = req.body;
        User
            .update({email, password, role}, {
                where: {
                    id: Number(req.params.id)
                }
            })
            .then(() => {
                res.status(200).json("User has been updated!");
            })
            .catch(err => {
                next(err);
            });
    }

    static delete(req, res, next) {
        User
            .destroy({
                where: {
                    id: Number(req.params.id)
                }
            })
            .then(() => {
                res.status(200).json("User has been deleted!");
            })
            .catch(err => {
                next(err);
            })
    }
}

module.exports = UserController;