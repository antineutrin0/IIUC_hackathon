// backend/src/seed/jobs.js
import mongoose from "mongoose";
import { Job } from "../models/jobModel.js";
import { jobSeeds } from "./jobSeeds.js"; // Your 20-job dataset

export const seedJobs = async () => {
  try {
    console.log("🌱 Seeding Jobs...");

    // Clear old seed entries
    await Job.deleteMany({ createdBy: "seed" });

    // Insert new data
    await Job.insertMany(jobSeeds);

    console.log(`✅ Inserted ${jobSeeds.length} jobs.`);
  } catch (error) {
    console.error("❌ Error seeding jobs:", error);
    throw error;
  }
};
