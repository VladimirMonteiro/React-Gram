require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')


const port = process.env.PORT


const app = express()



app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

//cors
app.use(cors({credentials: true, origin: "*"}))

//DB
require('./db/conn')


//routes
const routes = require('./routes/Router')

app.use(routes)



app.listen(port, ()=> {
    console.log('server running...')
})