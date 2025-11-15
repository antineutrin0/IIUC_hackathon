// backend/apiIntegration/cvUpdateRoute.js
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { UserProfile } from "../models/userProfile.js";

dotenv.config();
const cVrouter = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function extractDataFromCV(cvText) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
You are a strict CV → JSON parser. 
Your ONLY job is to convert the CV text into a JSON object EXACTLY matching the schema below.

⚠️ IMPORTANT RULES — FOLLOW STRICTLY ⚠️
1. Output ONLY valid JSON. No text before or after. No markdown. No explanations.
2. Do NOT include comments.
3. Do NOT change field names.
4. All strings MUST be valid JSON strings (double quotes only).
5. If information is missing in the CV → return an empty string "" or empty array [].
6. NEVER return undefined, null, or extra fields.
7. Arrays must NEVER contain undefined items.
8. Boolean values must be true or false.
9. Dates must be strings (not Date objects).
10. JSON must be valid and parseable on first attempt.

Here is the STRICT JSON template you MUST follow:

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
    { "name": "", "proficiency": "Basic" }
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
  "availability": "open_to_work"
}

Now extract the data from this CV:

<<<CV_TEXT_START>>>
${cvText}
<<<CV_TEXT_END>>>

Return ONLY the JSON above.`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  // ---- STRONGER JSON RECOVERY ----
  try {
    // Option 1: direct JSON parse
    return JSON.parse(text);
  } catch (err) {
    console.error("❌ First JSON parse failed. Attempting cleanup...");

    // Option 2: automatic cleanup (remove weird characters)
    const cleaned = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    try {
      return JSON.parse(cleaned);
    } catch (err2) {
      console.error("❌ Cleanup parse failed:", err2);
      throw new Error("AI returned invalid JSON");
    }
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
    console.log("Extracted CV Data:", parsedData);

    // 2️⃣ Find User Profile
    let profile = await UserProfile.findOne({ user: userId });

    if (!profile) {
        profile=await UserProfile.create({user:userId});
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
