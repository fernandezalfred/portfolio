import mongoose from "mongoose";

export default async function connectToDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://kaziariyan69:udemy12345@cluster0.97quxcm.mongodb.net/",
    );
    console.log("Database connected successfully");
  } catch (e) {
    console.log(e);
  }
}
