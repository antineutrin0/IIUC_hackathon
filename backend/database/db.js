import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        console.log('Connecting to MongoDB...',process.env.MONGO_URI);
        await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log('MongoDB connected successfully');
        
    } catch (error) {
        console.log('MongoDb connection error', error);
        
    }
}

export default connectDB;