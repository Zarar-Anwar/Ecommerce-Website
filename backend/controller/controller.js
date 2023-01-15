import data from "../data.js"
import productmodel from "../models/product.js"
import Usermodel from "../models/Usermodel.js"
import {generateToken} from "../utils.js"
import bcrypt from 'bcrypt'
import ordermodel from "../models/ordermodel.js"


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
    static userReg=async(req,res)=>{
        const {name,email,password,confirmpassword}=req.body
        if(name && email && password && confirmpassword)
        {
            const user=await Usermodel.findOne({email:email})
            if(!user)
            {   
                if(password==confirmpassword)
                {

                    const salt=await bcrypt.genSalt(10)
                    const hashPassword=await bcrypt.hash(password,salt)
                    const newUser=await new  Usermodel({
                        name:name,
                        email:email,
                        password:hashPassword,
                    }).save()
                    if(newUser)
                    {
                        res.send({
                            _id:newUser._id,
                            name:newUser.name,
                            email:newUser.email,
                            isAdmin:newUser.isAdmin,
                            token:generateToken(newUser)
                            
                        })
                    }else{
                        res.status(404).send({"msg":"User Not Found"})
                    }
                }else{
                    
                    res.status(404).send({"msg":"Password and ConfirmPassword do Not Match"})
                }
            }else{
                res.status(404).send({"msg":"User is Already Register"})
            }

        }else{
            res.status(404).send({"msg":"All Fields Are Required"})
        }
    }
    static order=async(req,res)=>{
        const newOrder =new ordermodel({
            orderItems:req.body.orderItems.map((x)=> ({...x,product: x._id})),
            shippingaddress:req.body.shippingaddress,
            paymentMethod:req.body.paymentMethod,
            itemsPrice:req.body.itemsPrice,
            shippingPrice:req.body.shippingPrice,
            taxPrice:req.body.taxPrice,
            totalPrice:req.body.totalPrice,
            user:req.user._id,
        })
        const order =await newOrder.save()
        res.status(201).send({message:"New Order Created",order})
    }
    static orderget=async(req,res)=>{
       const order=await ordermodel.findById(req.params.id)
       if(order)
       {
        res.send(order)
       } else{
        res.status(404).send({message:"Order Not Found"})
       }
    }
    static paypal=async(req,res)=>{
        res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
    }
    static idPay=async(req,res)=>{
        const order=await ordermodel.findById(req.params.id)
        if(order){
            order.isPaid=true
            order.paidAt=Date.now()
            order.paymentResult={
                id:req.body.id,
                status:req.body.status,
                update_time:req.body.update_time,
                email_address:req.body.email_address
            }
         const updatedOrder=await order.save()
         res.send({Message:"Order Paid",order:updatedOrder})
        }else{
            res.status(404).send({message:"Order Not Found"})
        }
    }
}

export default controller