const User = require('../models/User')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET


const authGuard = async (req, res, next) => {

    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    //check if header has been token
    if(!token) return res.status(401).json({erros: ["acesso negado"]})

    // check if token is valid

    try {

        const verifed = jwt.verify(token, jwtSecret)
        
        req.user = await User.findById(verifed.id).select("-password")
    
        next()
        
    } catch (error) {
        res.status(401).json({erros: ["Token invalído."]})
    }
}

module.exports = authGuard