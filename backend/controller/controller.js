import data from "../data.js"
import productmodel from "../models/product.js"


class controller{
    
    static showData=async(req,res)=>{
       const data= await productmodel.find()
       res.send(data)
    }


    static singleData=async(req,res)=>{
        const product= productmodel.findOne({slug:req.params.slug})
        // console.log(product)
        if(product){
            res.send(product)
        }else{
            res.status(404).send({message:'Product not found'})
        }
    }
    static addCart= async(req,res)=>{
        const product=productmodel.findById(req.params.id)
        // console.log(product)
        if(product){
            res.send(product)
        }else{
            res.status(404).send({message:'Product not found'})
        }
    }
    static seed=async(req,res)=>{
        await productmodel.remove({})
        const createdData=await productmodel.insertMany(data.product)
        res.send(createdData)
    }
}

export default controller