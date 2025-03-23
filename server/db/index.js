import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  // MongoDB connection
  try {
    const mongoURI = process.env.MONGODB_URI;

    // Check if MONGODB_URI is defined
    if (!mongoURI) {
      throw new Error("MONGODB_URI is not defined in the environment variables.");
    }

    console.log('MongoDB connection string:', mongoURI);
    
    const connection = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected:", connection.connection.host);
    
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
}

export default connectDB;