import data from "../data.js"
import productmodel from "../models/product.js"
import Usermodel from "../models/Usermodel.js"
import generateToken from "../utils.js"


class controller{

    static showData=async(req,res)=>{
       const data= await productmodel.find()
       res.send(data)
    }


    static singleData=async(req,res)=>{
        const product=await productmodel.findOne({slug:req.params.slug})
        // console.log(product)
        if(product){
            res.send(product)
        }else{
            res.status(404).send({message:'Product not found'})
        }
    }
    static addCart= async(req,res)=>{
        const product=await productmodel.findById(req.params.id)
        if(product){
            res.send(product)
        }else{
            res.status(404).send({message:'Product not found'})
        }
    }
    static seed=async(req,res)=>{
        await productmodel.remove({})
        const createdData=await productmodel.insertMany(data.product)
        await Usermodel.remove({})
        const createdUser=await Usermodel.insertMany(data.User)
        res.send({createdData,createdUser})
    }
    static userLogin=async(req,res)=>{
        const {email,password}=req.body
        if(email && password){
            const user=await Usermodel.findOne({email:email})
            if(user)
           {
            if(user.email==email && user.password==password)
            {

                res.send({
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    password:user.password,
                    isAdmin:user.isAdmin,
                    token:generateToken(user)
                })
            }else{
              res.send({"msg":"Email name Password Is not Correct"})
            }
           }else
           {
            res.status(404).send({"msg":"Email and Password is Invalid"})
           }
        }else{
            res.status(404).send({"msg":"All Fields Are Required"})
        }
    }
}

export default controller