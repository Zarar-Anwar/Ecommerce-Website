// import data from "../data.js"
import productmodel from "../models/product.js"
import Usermodel from "../models/Usermodel.js"
import {generateToken} from "../utils.js"
import bcrypt from 'bcrypt'
import ordermodel from "../models/ordermodel.js"
import transporter from "../config/emailconfig.js"
import jwt from 'jsonwebtoken'


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
    // static seed=async(req,res)=>{
    //     await productmodel.remove({})
    //     const createdData=await productmodel.insertMany(data.product)
    //     await Usermodel.remove({})
    //     const createdUser=await Usermodel.insertMany(data.User)
    //     res.send({createdData,createdUser})
    // }
    static userLogin=async(req,res)=>{
        const {email,password}=req.body
        if(email && password){
            const user=await Usermodel.findOne({email:email})
            if(user)
           {
            const Match=await bcrypt.compare(password,user.password)
            if(user.email==email && Match)
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
              res.status(404).send({"msg":"Email and Password Is not Correct"})
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
            user:req.user.userID,
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



    static orderMine=async(req,res)=>{
        const orders=await ordermodel.find({user:req.user._id})
        res.send(orders)

    }




    static userProfile=async(req,res)=>{
        const user=await  Usermodel.findById(req.user.userID)
        if(user){
            user.name=req.body.name || user.name
            user.email=req.body.email || user.email
            if(req.body.password)
            {
                const hashpassword=await bcrypt.hash(req.body.password,10)
                await Usermodel.findByIdAndUpdate(user._id,{$set:{password:hashpassword}})
            }
            const updatedUser=await user.save()
            res.send({
                _id:updatedUser._id,
                name:updatedUser.name,
                email:updatedUser.email,
                isAdmin:updatedUser.isAdmin,
                token:generateToken(updatedUser)
            })
        }else{
            res.status(404).send({message:"User Not  Found"})
        }
    }
    static categories=async(req,res)=>{
        const categories=await productmodel.find().distinct('category')
        res.send(categories)
    }

    static search=async(req,res)=>{
        console.log("I am in Search")
        const PAGE_SIZES=3
        const {query}=req
        const pageSize=query.pageSize || PAGE_SIZES
        const page=query.page || 1
        const category=query.category || ""
        const brand=query.brand || ""
        const prices=query.prices || ""
        const rating=query.rating || ""
        const order=query.order || ""
        const searchQuery=query.query || ""
        
        const queryFilter=
        searchQuery && searchQuery !=="all"
        ?{
            name:{$regex:searchQuery,$options:'i'}
        }:{}
        
        const categoryFilter=
        category && category!=='all' ? {category}:{}
         
        const ratingFilter=
        rating && rating !=='all'?{
            rating:{
                $gte:Number(rating)
            }
        }:{}

        const pricesFilter=
        prices && prices !== 'all'?
        {
            prices:{
                $gte:Number(prices.split('-')[0]),
                $lte:Number(prices.split('-')[1])
            }
        }:{}
   
          const sortOrder=
          order==="featured"
          ?{featured:-1}:order==='lowest'
          ?{prices:1}:order==='highest'
          ?{prices:-1}:order==='toprated'
          ?{prices:-1}:order==="newest"
          ?{createdAt:-1}:{_id:-1}
          

        const product=await productmodel.find(
            {
                ...queryFilter,
                ...categoryFilter,
                ...pricesFilter,
                ...ratingFilter
            }
            )
            .sort(sortOrder)
            .skip(pageSize*(page-1))
            .limit(pageSize)
            
            const countProducts=await productmodel.countDocuments({
                ...queryFilter,
                ...categoryFilter,
                ...pricesFilter,
                ...ratingFilter
        })
         
        res.send({
            product,
            countProducts,
            page,
            pages:Math.ceil(countProducts/pageSize)})
    }
    static resetpassword=async(req,res)=>{
        const {email}=req.body
        if(email){
            const user=await Usermodel.findOne({email:email})
            if(user){
               const token=jwt.sign({userID:user._id},process.env.JWT_SECRET,{expiresIn:'15min'})
               const link=`http://localhost:5000/reset/${user._id}/${token}`
               const info={
                from:process.env.email,
                to:user.email,
                subject:"Ecommerce Password Reset Email ",
                html:`<h1><a href='${link}'>Click Me</a> to Reset Your Password</h1>`
               }
               await transporter.sendMail(info)
            }else{
                res.status(404).send("Email is Invalid")
            }
        }else{
            res.status(404).send("All Fields Are Required")
        }
    }
    static updateResetPassword=async(req,res)=>{
        const {id,token}=req.params
        const {password,confirmpassword}=req.body

        if(password && confirmpassword)
        {
            if(password==confirmpassword){
               const user=await Usermodel.findById(id)
               const NewToken=process.env.JWT_SECRET
               const compare=jwt.verify(token,NewToken)
               if(user && compare){
                const hashPassword=await bcrypt.hash(password,10)
                const updateUser=await Usermodel.findByIdAndUpdate({id},{password:hashPassword})
                res.status(200).send("Password Updated Successfully")
               }else{
                   res.status(404).send("User not exist")
               }
            }else{

                res.status(404).send("Password and ConfirmPassword Do not match")
            }
        }else{
            res.status(404).send("All Fields Are Required")
        }
    }
}

export default controller