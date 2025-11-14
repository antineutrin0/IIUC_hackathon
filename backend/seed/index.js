// backend/src/seed/index.js
import mongoose from "mongoose";
import dotenv from "dotenv";

import { seedJobs } from "./jobs.js";
import { seedResources } from "./resources.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || process.env.DATABASE_URL;

if (!MONGO_URI) {
  console.error("❌ No MongoDB URI found in environment variables!");
  process.exit(1);
}

const runSeed = async () => {
  try {
    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);

    console.log("⚡ Running seeders...");
    
    await seedJobs();
    await seedResources();

    console.log("🎉 All seeders completed successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    console.log("🔌 Closing DB connection...");
    await mongoose.connection.close();
    process.exit(0);
  }
};

runSeed();
