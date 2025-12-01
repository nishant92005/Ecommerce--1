import mongoose from "mongoose";

// Local MongoDB Connection (Requested: localhost:27017 with DB name ecom)
const localConnection = "";

// MongoDB Atlas Connection (agar cloud use kar rahe hain)
// Uncomment karke apna connection string paste karein:
// const atlasConnection = "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecom?retryWrites=true&w=majority";

mongoose.connect(localConnection)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error.message);
    console.log("⚠️  Server will continue running, but database operations will fail.");
    console.log("💡 Make sure MongoDB is installed and running on localhost:27017");
    console.log("💡 Ya MongoDB Atlas connection string use karein (config.js mein uncomment karein)");
  });
