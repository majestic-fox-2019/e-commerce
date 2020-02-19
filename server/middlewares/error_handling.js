function errorHandling(err, req, res, next){
    try {
        if (err.statusCode) { // Handling Error with status code and message, such as 404
            const message = err.message.name === 'JsonWebTokenError' ?  'Un-authorized' : err.message;
            res.status(err.statusCode).json({error: message});
        }else if(err.message.length > 0) { // Handling validations error from model, 400
            let arrValidations = [];
            err.errors.forEach(validation => {
                arrValidations.push(validation.message);
            });
            res.status(400).json({error: arrValidations});                        
        }            
    } catch (error) { // 500
        res.status(500).json({msg:"Something went wrong... it's not your fault, that's our server problem!"});
    }
}

module.exports = errorHandling