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
You are an AI Job Comparison Engine. Your task is to compare a user's profile with a job description and generate a STRICT, VALID JSON output.
READ THESE RULES CAREFULLY AND FOLLOW THEM EXACTLY:
### OUTPUT RULES (VERY IMPORTANT)
1. Output **ONLY JSON**.
2. NO text before or after the JSON.
3. NO markdown.
4. The JSON must match EXACTLY the following schema:

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
### SCORING RULES
- matchScore = integer between **0 to 100**
- Formula (use this strictly):
  - Skill Match = 60% weight  
  - Experience Match = 25%  
  - Requirement Fit = 15%  
- DO NOT exceed the 0–100 range.

### SKILL MATCHING RULES
- Normalize skills: lowercase, trim spaces.
- Compare against job.requiredSkills or job.description.
- skillMatch = intersection(user.skills, job.skills)
- missingSkills = job.skills NOT found in user.skills
- If job has no skill list, extract skills from description.

### EXPERIENCE ANALYSIS RULES
- Check total years from profile.education, profile.projects, profile.bio.
- If user has more experience than required → say so.
- If less → say clearly.
- experienceNote = 1-2 sentence summary.

### STRENGTHS & WEAKNESSES RULES
- strengths = what the user has that fits job needs (skills, projects, degrees)
- weaknesses = missing skills, lack of experience, tech gaps
- Keep each item short (5–12 words).

### SUMMARY RULES
- fitSummary = 2-3 sentence evaluation, neutral tone.
- DO NOT reference being an AI.
- DO NOT include recommendations beyond the job fit.
### CHART DATA RULES
**skillsRadar**
- labels = all unique skills (combined user + job)
- user = array of 0/1 (1 if user has skill, else 0)
- job = array of 0/1 (1 if job requires skill, else 0)
**gapBar**
- labels = missingSkills
- values = give severity score (1-8) based on importance in job description
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
${COMPARE_FORMAT}

--- JOB DATA ---
${JSON.stringify(job, null, 2)}

--- USER DATA ---
${JSON.stringify(profile, null, 2)}

──────────────────────
### FINAL INSTRUCTION
Return **ONLY THE JSON**, strictly following the schema above.
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
