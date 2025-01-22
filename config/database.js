import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set('strictQuery', true); // only data specified in our schema will be saved to the database

  // If the database is already connected, don't connect again
  if (connected) {
    console.log('MongoDB is connected');
    return;
  }

  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;

  } catch(error) {
    console.log(error);
    return new Error('Could not connect to database');
  }
};

export default connectDB;