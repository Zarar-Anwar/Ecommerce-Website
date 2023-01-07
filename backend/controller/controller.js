import data from "../data.js"


class controller{
    static showData=(req,res)=>{
        res.send(data)
    }
    static singleData=(req,res)=>{
        const product= data.product.find(x=> x.slug===req.params.slug)
        // console.log(product)
        if(product){
            res.send(product)
        }else{
            res.status(404).send({message:'Product not found'})
        }
    }
    static addCart=(req,res)=>{
        const product=data.product.find(x => x._id === req.params.id)
        console.log(product)
        if(product){
            res.send(product)
        }else{
            res.status(404).send({message:'Product not found'})
        }
    }
}

export default controller