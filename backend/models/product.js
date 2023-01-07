import mongoose from 'mongoose'

const productSchema=new mongoose.Schema({
    name:{type:String,required:true,trim:true,unique:true},
    slug:{type:String,required:true,trim:true,unique:true},
    image:{type:String,required:true},
    brand:{type:String,required:true},
    category:{type:String,required:true},
    description:{type:String,required:true},
    prices:{type:Number,required:true},
    countInStock:{type:Number,required:true},
    rating:{type:Number,required:true},
    numReviews:{type:Number,required:true},
},
{
    timestamps:true
})
const productmodel=mongoose.model("Product",productSchema)

export default productmodel