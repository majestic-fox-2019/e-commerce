module.exports = function (err, req, res, next) {
    if(err.name == 'SequelizeValidationError'){
        // console.log(err);
        let errors = []
        err.errors.forEach((err2) => {
            errors.push(err2.message)
        })
        
        res.status(400).json({msg: errors})
    } else if (err.hasOwnProperty('statusCode') && err.hasOwnProperty('message')) {
        let status = err.statusCode
        let msg = err.message
        res.status(status).json({msg: msg})
    } else {
        console.log(err)
        res.status(500).json('Internal server error')
    }
}