import mongoose from "mongoose";

const connectDB = async () => {
  // 1. Check if we already have a connection (0 = disconnected, 1 = connected)
  if (mongoose.connection.readyState >= 1) {
    return; 
  }

  try {
    // 2. Add options to handle the "Serverless" environment better
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Wait 5 seconds instead of 30
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection error:", error);
    // Important for Vercel: if it fails, don't let it hang
    process.exit(1); 
  }
};

export default connectDB;