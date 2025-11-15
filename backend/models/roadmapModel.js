import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    targetJob: {
      type: String,
      required: true,
    },

    timeframe: {
      type: String,
    },

    roadmapData: {
      type: Object, // The JSON returned by Gemini
      required: true,
    }
  },
  { timestamps: true }
);

export const Roadmap = mongoose.model("Roadmap", roadmapSchema);
