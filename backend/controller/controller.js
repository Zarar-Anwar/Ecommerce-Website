import data from "../data.js"


class controller{
    static showData=(req,res)=>{
        res.send(data)
    }
}

export default controller