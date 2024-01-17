const express = require('express')
const router = express.Router()

//Controller
const {insertPhoto, deletePhoto, getAllPhotos, userPhotos, getPhotoById, updatePhoto, likePhoto, commentPhoto, searchPhotos} = require('../controllers/photoController')


//Middlewares
const {photoInsertValidations, photoUpdateValidations, commentsValidations} = require("../middlewares/photoValidations")
const authGuard = require("../middlewares/authGuard")
const validate = require('../middlewares/handleValidation')
const imageUpload = require('../middlewares/imageUpload')
 
//Routes
router.post('/insert',authGuard,imageUpload.single("image"), photoInsertValidations(), validate, insertPhoto)
router.delete('/:id', authGuard, deletePhoto)
router.get('/', authGuard, getAllPhotos)
router.get('/user/:id', authGuard, userPhotos)
router.get('/search', authGuard, searchPhotos)

router.get('/:id', authGuard, getPhotoById),
router.put('/:id', authGuard, photoUpdateValidations(), validate, updatePhoto)
router.put('/like/:id', authGuard, likePhoto)
router.put('/comment/:id', authGuard,commentsValidations(), validate, commentPhoto)




module.exports = router

