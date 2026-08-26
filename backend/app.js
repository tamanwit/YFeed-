const express = require('express')
require('dotenv').config()
const app = express()
const router = require('./routes/route')

app.use(express.json())
app.use('/db', router)

app.listen(process.env.PORT, ()=>console.log('server running'))