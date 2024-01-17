const {validationResult} = require('express-validator')


const validate = (req, res, next)=> {

    const errors = validationResult(req)

    if(errors.isEmpty()){
        return next()
    }

    const extradedErrors = []

    errors.array().map((err)=> extradedErrors.push((err.msg)))

    return res.status(422).json({
        errors: extradedErrors
    })
}


module.exports = validate