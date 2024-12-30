import mongoose from "mongoose";

let isConnected = false;
export const connectDB = async () =>{
    mongoose.set('strictQuery', true)
    if(isConnected) {
        console.log('Already connected to MongoDB');
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: 'share_promp_one',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected = true;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
}