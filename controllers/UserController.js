const User = require("../models/User")

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET


//Generate user token

const generateToken = (id)=> {
    return jwt.sign({id}, jwtSecret, { expiresIn: "7d"})
}


//Register user and singn in
const register = async (req, res)=> {
    
    const {name, email, password, confirmPassword} = req.body


    //check if user exists
    const checkUserIfExists = await User.findOne({email: email})

    if(checkUserIfExists){
        res.status(422).json({errors: "Usuário existente, informe outro e-mail."})
        return
    }

    //crypt user password
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)


    try {

        const newUser = await User.create({
            name,
            email,
            password: passwordHash
        })

        res.status(201).json({_id: newUser._id, token: generateToken(newUser._id)})
      


        
    } catch (error) {
        console.log(error)
        res.status(422).json({errors: "Houve um erro no sistema, tente mais tarde."})
        
        
    }
}


const login = async (req, res) => {

    const {email, password} = req.body


    const user = await User.findOne({email: email})

    if(!user){
        res.status(422).json({errors: ["E-mail inválido, tente novamente."]})
        return

    }

    //check password
    if(!(await bcrypt.compare(password, user.password))){
        res.status(404).json({erros: ["Senha inválida, tente novamente."]})
        return
    }


    res.status(200).json({
        _id: user._id, profileImage: user.profileImage, token: generateToken(user._id)
    })


}


const getCurrentUser = async (req, res) => {
    const user = req.user

    res.status(200).json({user})
}


module.exports = {
    register,
    login,
    getCurrentUser,
}