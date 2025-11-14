import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { UserProfile } from "../models/userProfile.js";
import { Job } from "../models/jobModel.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

dotenv.config();
const careerRoadmap = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ---- CONSTANT ROADMAP FORMAT ----
const ROADMAP_FORMAT = `
Return ONLY valid JSON. No explanation text, no markdown, no commentary.
Respond using EXACTLY this JSON structure:

{
  "jobTitle": "",
  "targetRole": "",
  "totalDurationWeeks": 0,

  "overview": {
    "summary": "",
    "skillsToDevelop": [],
    "technologiesToLearn": [],
    "prerequisites": []
  },

  "phases": [
    {
      "phaseNumber": 1,
      "title": "",
      "startWeek": 1,
      "endWeek": 4,
      "topics": [],
      "technologies": [],
      "projectIdeas": [],
      "expectedOutcome": ""
    }
  ],

  "applicationGuidance": {
    "recommendedStartWeek": 0,
    "whatToHaveReady": [],
    "howToApply": []
  },

  "extraRecommendations": {
    "learningResources": [
      { "title": "", "type": "", "platform": "", "url": "" }
    ],
    "commonMistakes": [],
    "motivation": ""
  }
}
`;


careerRoadmap.post("/", isAuthenticated, async (req, res) => {
    console.log("Received roadmap generation request");
  try {
    const userId = req.user._id;
    const { targetJob, timeframe } = req.body;

    if (!userId || !targetJob) {
        console.log("Missing userId or targetJob");
      return res.status(400).json({ error: "userId and target job are required" });
    }

    // Load user profile + job from MongoDB
    const profile = await UserProfile.findOne({ user: userId }).lean();

    if (!profile) return res.status(404).json({ error: "User profile not found" });
    
    const prompt = `
You are an AI career roadmap generator.

USER PROFILE:
${JSON.stringify(profile, null, 2)}

TARGET JOB:
${JSON.stringify(targetJob, null, 2)}

Timeframe to achieve the goal: ${timeframe || "as soon as possible"}

Generate a tailored learning roadmap for this user to match the job.
RULES:
- Divide roadmap into 3–6 phases.
- Each phase must contain: startWeek, endWeek, topics, technologies, projectIdeas, expectedOutcome.
- Weeks must be sequential and non-overlapping.
- Include simple project ideas for each phase.
- Choose the correct week for the user to start applying for jobs/internships.
- Only output valid JSON.
- Keep formatting consistent for all users and all job roles.

${ROADMAP_FORMAT}
`;

    
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);

    let text = result.response.text();

    try {
      // Some outputs may have backticks or whitespace
      text = text.replace(/```json|```/g, "").trim();
      const json = JSON.parse(text);
      return res.json(json);
    } catch (err) {
      console.error("JSON parse error:", err);
      return res.status(500).json({
        error: "Gemini did not return valid JSON",
        raw: text
      });
    }

  } catch (err) {
    console.error("Roadmap API error:", err);
    res.status(500).json({ error: "Failed to generate roadmap" });
  }
});

export default careerRoadmap;


