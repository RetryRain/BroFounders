import mongoose from "mongoose";

export default async function () {
  try {
    await mongoose.connect("mongodb://localhost/halfass");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
}
