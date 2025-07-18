import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI 
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');
        console.log(`Database URI: ${mongoURI}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;
