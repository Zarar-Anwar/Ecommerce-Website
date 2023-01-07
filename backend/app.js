import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import router from './Routes/routes.js'

const app=express()
const port=process.env.PORT 
const DATABASE_URL=process.env.DATABASE_URL


app.use('/',router)



app.listen(port,(req,res)=>{
    console.log(`The Server is Running at http://localhost:${port}`)
})