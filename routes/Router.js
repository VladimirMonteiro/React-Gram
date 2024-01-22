const express = require('express')
const router = express()



//user routes
router.use('/api/user', require('./UserRoutes'))

//photo routes
router.use('/api/photos', require('./PhotoRoutes'))



router.get('/', (req,res)=> {
    res.send('API WORKING')
})



module.exports = router


