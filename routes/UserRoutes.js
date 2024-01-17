const express = require('express')
const router = express.Router()


//Controllers
const {register, login, getCurrentUser} = require('../controllers/UserController')

//middlewares
const validate = require('../middlewares/handleValidation')
const {userCreateValidations, loginValidations} = require('../middlewares/userValidations')
const authGuard = require('../middlewares/authGuard')


//Routes
router.post("/register",userCreateValidations(), validate, register)
router.post('/login', loginValidations(), validate, login)
router.get('/profile', authGuard, getCurrentUser)


module.exports = router