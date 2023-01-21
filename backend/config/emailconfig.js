import dotenv from 'dotenv'
dotenv.config()
import nodemailer from 'nodemailer'

var transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"",
        pass:"",
    }
})

export default transporter