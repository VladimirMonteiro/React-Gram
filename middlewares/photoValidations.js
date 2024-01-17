const {body} = require('express-validator')


const photoInsertValidations = () => {
    return [body("title").not().equals().withMessage("O titulo é obrigatório.").isString().withMessage("O titulo é obrigatório.").isLength({min:3}).withMessage("Titulo precisa ter 3 caracteres"),
body("image").custom((value, {req}) => {
    if(!req.file){
        throw new Error("A imagem é obrigatória.")
    }
    return true
})]
}


const photoUpdateValidations = ()=> {
    return[body("title").optional().isString().withMessage("O titulo é obrigatório.").isLength({min:3}).withMessage("O titulo deve conter pelo menos 3 caracteres.")]
}

const commentsValidations = ()=> {
    return [body("comments").isLength().withMessage("O comentário é obrigatório. ")]
}


module.exports = {
    photoInsertValidations,
    photoUpdateValidations,
    commentsValidations
}



