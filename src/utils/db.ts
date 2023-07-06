import mongoose from 'mongoose'

const connect = async () => {
   const mongoURL = process.env.MONGO_URL
   if(!mongoURL) {
    throw new Error("MONGO_URL environment not defined")
   }
   try{
    await mongoose.connect(mongoURL)
   }catch(e){
    throw new Error("Database connection Failed")
   }
}

export default connect