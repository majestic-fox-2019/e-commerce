module.exports = (err,req,res,next) => {
    // console.log(err)
    // console.log(err.name)
    if(err.name){
        switch (err.name){
            case 'SequelizeValidationError' : 
            res.status(400).json({msg : err.errors[0].message})
            break
        }
    }

    switch (err){
        case 500 : 
            res.status(500).json({msg : 'Internal error'})
            break
        case "invalid-token" : 
            res.status(401).json({msg : 'Invalid token'})
            break
        case 'user-not-found' : 
            res.status(404).json({msg : 'User not found'})
            break
        case 'product-not-found' : 
            res.status(404).json({msg : 'Product not found'})
            break
        case 'cart-not-found' : 
            res.status(404).json({msg : 'Cart not found'})
            break
        case 'unauthorized' : 
            res.status(401).json({msg : 'Unauthorized'})
            break
        case 'invalid-password' : 
            res.status(400).json({msg : 'Invalid password'})
            break
        case 'login-required' : 
            res.status(400).json({msg : 'Email/Password is required'})
            break
    }
};
