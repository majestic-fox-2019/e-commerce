const {tokenVerifier} = require('../helpers/jwt');
const User = require('../models').User;

module.exports =(req,res,next) => {
    try{
        let user = tokenVerifier(req.headers.token)
        req.user = user
        console.log('req.user : ')
        console.log(req.user)
        User.findOne({
            where : {
                email : req.user.email
            }
        })
        .then(response => {
            if(!response){
                next('user-not-found')
            }
        })
        next()
    } catch(err){
        next('invalid-token')
    }
};
