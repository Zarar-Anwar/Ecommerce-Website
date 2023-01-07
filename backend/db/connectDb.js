import mongoose from "mongoose";
mongoose.set('strictQuery', false)
const connectDb=async(DATABASE_URL)=>{
    try {
        await mongoose.connect(DATABASE_URL)
        console.log("DataBase Connected Succsessfull")
    } catch (error) {
        console.log(error.message)
    }
}

export default connectDb