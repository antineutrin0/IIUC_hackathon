import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { UserProfile } from "../models/userProfile.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

dotenv.config();

const chatRouter = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `
You are a professional career assistant. 
Your job is to provide helpful, clear career advice.
Responses must be relevant and alligned with youth employment and SDG 8 goals.
Clearly indicate when the bot is suggesting, not guaranteeing outcomes.

STRICT OUTPUT RULES:
1. Output ONLY the final message.
2. NO markdown.
3. NO formatting.
4. NO lists.
5. NO intro, no summary, no labels.
6. Max length: 200 characters.
7. Tone: friendly, useful.
`;

chatRouter.post("/", isAuthenticated, async (req, res) => {
  console.log("📥 chat API Request Received");
  try {
    const userId = req.user._id;
    const { conversation } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "user not found" });
    }

    const profile = await UserProfile.findOne({ user: userId }).lean();
    if (!profile)
      return res.status(404).json({ error: "User profile not found" });

    const prompt = `
${SYSTEM_PROMPT}

--- USER PROFILE ---
${JSON.stringify(profile)}

--- LAST 20 MESSAGES ---
${JSON.stringify(conversation)}

Respond with a single short helpful message of at most 4 sentence.
ONLY return the text. Nothing else.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);

    let text = result.response.text().trim();

    // Cleanup safety (removes backticks or markdown)
    text = text.replace(/```/g, "").trim();

    console.log("AI Output:", text);
    return res.json({ text });
  } catch (err) {
    console.error("❌ chat API Error:", err);
    res.status(500).json({ error: "AI chat failed" });
  }
});

export default chatRouter;
