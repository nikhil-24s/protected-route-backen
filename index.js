require('dotenv').config()
const connectToDb = require('./config/db')
const cors = require('cors')
const userRoutes = require('./routes/user.route')

const express= require('express')
const app = express()

// Connection with DB 
connectToDb()

// Middlewares 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

// Routes 
app.use('/api',userRoutes)

// Server 
const port =  process.env.PORT || 4000
app.listen(port, (error)=>{
    if (error) {
        console.log(`failed to start server : ${error}`);
    } else {
        console.log(`server runnning on port : ${port}`);
    }
})