const User = require('../models').User;
class UserController {
    static login(req, res, next) {
        const {email, password} = req.body;
        res.status(200).json({token: "asdsatest", email});
        // User
        //     .findOne({email})
    }

    static register() {
        
    }
}

module.exports = UserController;