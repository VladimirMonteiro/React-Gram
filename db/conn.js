const mongoose = require('mongoose')
const userDB = process.env.USERDB
const passwordDB = process.env.PASSWORDDB




const conn = async ()=> {
    try {
        
        const dbConn = await mongoose.connect(`mongodb+srv://${userDB}:${passwordDB}@cluster1.y7lc0pk.mongodb.net/?retryWrites=true&w=majority`)

        console.log('Conectado ao MongoDB')

        return dbConn
        
    } catch (error) {
        console.log(error)
        
    }

}


conn()


module.exports = conn