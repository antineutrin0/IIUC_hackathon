// backend/apiIntegration/cvUpdateRoute.js
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { UserProfile } from "../src/models/profile.js";

dotenv.config();
const cVrouter = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ----------------------
// HELPER: AI extraction
// ----------------------
async function extractDataFromCV(cvText) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
You are an expert CV parser. 
Extract all structured data from the following CV text and return ONLY a valid JSON object matching this structure:

{
  "skills": [],
  "education": [
    {
      "institution": "",
      "degree": "",
      "fieldOfStudy": "",
      "startYear": "",
      "endYear": "",
      "grade": ""
    }
  ],
  "projects": [
    {
      "title": "",
      "description": "",
      "techStack": [],
      "link": "",
      "startDate": "",
      "endDate": "",
      "isOngoing": false
    }
  ],
  "languages": [
    { "name": "", "proficiency": "Basic/Conversational/Fluent/Native" }
  ],
  "address": {
    "country": "",
    "state": "",
    "city": "",
    "street": "",
    "postalCode": ""
  },
  "bio": "",
  "headline": "",
  "targetRoles": [],
  "availability": "student/employed/unemployed/looking/open_to_work/not_looking"
}

CV TEXT:
${cvText}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("❌ JSON Parse Error", err);
    throw new Error("AI returned invalid JSON");
  }
}

// ----------------------
// ROUTE: Update User Profile
// ----------------------
cVrouter.post("/update-from-cv", async (req, res) => {
  try {
    const { userId, cvText } = req.body;

    if (!userId || !cvText) {
      return res.status(400).json({ error: "userId and cvText are required" });
    }

    // 1️⃣ Get AI extracted structured data
    const parsedData = await extractDataFromCV(cvText);

    // 2️⃣ Find User Profile
    const profile = await UserProfile.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({ error: "User profile not found" });
    }

    // 3️⃣ Update fields safely
    profile.cvText = cvText;

    if (parsedData.skills) profile.skills = parsedData.skills;
    if (parsedData.education) profile.education = parsedData.education;
    if (parsedData.projects) profile.projects = parsedData.projects;
    if (parsedData.languages) profile.languages = parsedData.languages;
    if (parsedData.address) profile.address = parsedData.address;

    if (parsedData.bio) profile.bio = parsedData.bio;
    if (parsedData.headline) profile.headline = parsedData.headline;
    if (parsedData.targetRoles) profile.targetRoles = parsedData.targetRoles;
    if (parsedData.availability) profile.availability = parsedData.availability;

    profile.lastProfileUpdateAt = new Date();

    // 4️⃣ Save
    await profile.save();

    res.json({
      success: true,
      message: "Profile updated from CV successfully",
      data: profile,
    });

  } catch (err) {
    console.error("❌ CV Update Error", err);
    res.status(500).json({ error: "Failed to update profile from CV", details: err.message });
  }
});

export default cVrouter;
