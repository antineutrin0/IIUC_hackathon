// backend/src/seed/resources.js
import mongoose from "mongoose";
import { Resource } from "../models/resourceModel.js";
import { resourceSeeds } from "./resourceSeeds.js"; // Your seed array file

export const seedResources = async () => {
  try {
    console.log("🌱 Seeding Learning Resources...");

    // Clear old data created by previous seeds
    await Resource.deleteMany({ createdBy: "seed" });

    // Insert new seed data
    await Resource.insertMany(resourceSeeds);

    console.log(`✅ Inserted ${resourceSeeds.length} learning resources.`);
  } catch (error) {
    console.error("❌ Error seeding resources:", error);
    throw error;
  }
};
