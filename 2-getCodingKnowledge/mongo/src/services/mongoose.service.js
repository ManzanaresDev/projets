import mongoose from "mongoose";

export async function connectDB() {
  const mongoUri = process.env.MONGO_URI;
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "myAppDB",
    });
    console.log("✅ Database connected");
  } catch (err) {
    console.error("❌ Database error:", err);
    process.exit(1);
  } finally {
    // await mongoose.connection.close();
    // console.log("🔒 Database closed");
  }
}
