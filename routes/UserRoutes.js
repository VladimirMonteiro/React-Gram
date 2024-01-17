const express = require('express')
const router = express.Router()


//Controllers
const {register, login, getCurrentUser, update, getUserById} = require('../controllers/UserController')

//middlewares
const validate = require('../middlewares/handleValidation')
const {userCreateValidations, loginValidations, userUpdateValidations} = require('../middlewares/userValidations')
const authGuard = require('../middlewares/authGuard')
const imageUpload = require('../middlewares/imageUpload')


//Routes
router.post("/register",userCreateValidations(), validate, register)
router.post('/login', loginValidations(), validate, login)
router.get('/profile', authGuard, getCurrentUser)
router.get('/:id', getUserById)
router.put('/update', authGuard, userUpdateValidations(),validate, imageUpload.single("profileImage"), update)


module.exports = router