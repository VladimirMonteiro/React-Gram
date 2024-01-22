const { body } = require('express-validator')



const userCreateValidations = () => {
    return [body("name").isString().withMessage("O nome é obrigatório.").isLength({min:3}).withMessage("O nome precisa no minímo 3 caracteres."),
    body("email").isString().withMessage("O e-mail é obrigatório.").isEmail().withMessage("Insira um e-mail valído."),
    body("password").isString().withMessage("A senha é obrigatória.").isLength({min: 5}).withMessage("Minímo 5 caracteres"),
    body("confirmPassword").isString().withMessage("A cofirmação de senha é obrigatória").custom((value, {req})=> {
        if(value != req.body.password){
            throw new Error("As senhas precisam ser iguais.")
        }
        return true
    })
    ]

}


const loginValidations = () => {
    return [body("email").isString().withMessage("O e-mail é obrigatório.").isEmail().withMessage("Insira um e-mail valído."),
body("password").isString().withMessage("A senha é obrigatória.")]
}


const userUpdateValidations = () => {
    return [body("name").optional().isLength({min:3}).withMessage("O nome precisa no minímo 3 caracteres."), body("password").optional().isLength({min:5}).withMessage("Minímo 5 caracteres")]
}




module.exports = {
    userCreateValidations,
    loginValidations,
    userUpdateValidations
}