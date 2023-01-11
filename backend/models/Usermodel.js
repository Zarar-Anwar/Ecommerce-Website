import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    name:{type:String, required:true ,trim:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    isAdmin:{type:Boolean,default:false,},
})

const Usermodel=mongoose.model('User',userSchema)

export default Usermodel