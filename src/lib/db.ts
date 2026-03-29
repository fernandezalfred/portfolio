import mongoose from "mongoose";

export default async function connectToDB(): Promise<void> {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI environment variable is not set");
    await mongoose.connect(uri);
    console.log("Database connected successfully");
  } catch (e) {
    console.error(e);
  }
}
