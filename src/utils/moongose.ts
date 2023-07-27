import mongoose from "mongoose"

export const connect = () =>{
    if (mongoose.connection.readyState === 1){
        return mongoose.connection.asPromise()
    }
    else{
        const url = process.env.MONGO_URL 
        return mongoose.connect(url as string)
    }
}