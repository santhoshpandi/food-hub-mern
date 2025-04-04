//-----------------------------------------------------
//Import default
const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
//-----------------------------------------------------
//Import Custom
const foodDB = require('./config/foodDB')
const billRouter = require('./routes/api/bill')
const userRouter = require('./routes/api/user')
const refreshRouter = require('./routes/api/refresh')
const verifyJWT = require('./middleware/verifyJWT')
//-----------------------------------------------------
//Configuration
require('dotenv').config()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(cors({
  origin: process.env.FRONT_END_URL,
  credentials: true,
}))

console.log(process.env.FRONT_END_URL)
foodDB()

//-----------------------------------------------------

app.use('/api/user',userRouter)
app.use('/api/refresh',refreshRouter)

app.use(verifyJWT)
app.use('/api',billRouter)


app.listen(port ,()=>{
  console.log('Server listening to port: '+port+"💖")
})