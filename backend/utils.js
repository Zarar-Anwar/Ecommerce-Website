import jwt from 'jsonwebtoken'

const generateToken=(user)=>{
return jwt.sign({userID:user._id},process.env.JWT_SECRET,{expiresIn:'30d'})
}


const isAuth=(req,res,next)=>{
    const authorization=req.headers.authorization
    if(authorization)
    {
      const token=authorization.slice( 7,authorization.length)
      jwt.verify(token,process.env.JWT_SECRET,
        (err,decode)=>{
            if(err){
                res.status(404).send({message:'Invalid Token'})
            }
            else{
                req.user=decode
            }
        })
        
    }else{
        res.status(404).send({message:"No Token"})
    }
    next()
}



export  {generateToken, isAuth}