import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { UserProfile } from "../models/userProfile.js";
import { Job } from "../models/jobModel.js";

dotenv.config();

const compareRouter = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ---------------------------
// EXPECTED STRICT JSON FORMAT
// ---------------------------
const COMPARE_FORMAT = `
Return ONLY valid JSON. No explanation text, no markdown, no commentary.

{
  "matchScore": 0, 
  "skillMatch": [],
  "missingSkills": [],
  "experienceNote": "",

  "strengths": [],
  "weaknesses": [],
  "fitSummary": "",

  "charts": {
    "skillsRadar": {
      "labels": [],
      "user": [],
      "job": []
    },
    "gapBar": {
      "labels": [],
      "values": []
    }
  }
}
`;

compareRouter.post("/", async (req, res) => {
  console.log("📥 Compare API Request Received");

  try {
    const { userId, jobId } = req.body;

    if (!userId || !jobId) {
      return res.status(400).json({ error: "userId and jobId are required" });
    }

    // -----------------------------
    // Load user + job
    // -----------------------------
    const profile = await UserProfile.findOne({ user: userId }).lean();
    const job = await Job.findById(jobId).lean();

    if (!profile) return res.status(404).json({ error: "User profile not found" });
    if (!job) return res.status(404).json({ error: "Job not found" });

    // -----------------------------
    // Build prompt
    // -----------------------------
    const prompt = `
You are an AI job comparison engine. Compare the job description and user profile.

--- JOB DATA ---
${JSON.stringify(job, null, 2)}

--- USER DATA ---
${JSON.stringify(profile, null, 2)}

Generate strong insights, highlight strengths & weaknesses, quantify skill gaps.

${COMPARE_FORMAT}
`;

    // -----------------------------
    // Gemini Model
    // -----------------------------
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);

    let text = result.response.text();
    console.log("Raw Gemini Output:", text);

    try {
      // cleanup ```json blocks
      text = text.replace(/```json|```/g, "").trim();

      const json = JSON.parse(text);
      return res.json(json);
    } catch (err) {
      console.error("❌ JSON parse failed:", err);
      return res.status(500).json({
        error: "Gemini did not return valid JSON.",
        raw: text
      });
    }
  } catch (err) {
    console.error("❌ Compare API Error:", err);
    res.status(500).json({ error: "AI comparison failed" });
  }
});

export default compareRouter;
