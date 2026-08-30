const express = require('express')
const connectDB = require('./config/db')
require('dotenv').config()
const app = express()
connectDB()
const authRouter = require('./routes/authRouter')
const profileRouter = require('./routes/profileRouter')

app.use(express.json())
app.use('/db', authRouter)
app.use('/user', profileRouter)

app.listen(process.env.PORT, ()=>console.log('server running'))