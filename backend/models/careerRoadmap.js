const mongoose = require("mongoose");

const PhaseSchema = new mongoose.Schema({
  phaseNumber: { type: Number, required: true },
  title: { type: String, required: true },
  startWeek: { type: Number, required: true },
  endWeek: { type: Number, required: true },
  topics: { type: [String], default: [] },
  technologies: { type: [String], default: [] },
  projectIdeas: { type: [String], default: [] },
  expectedOutcome: { type: String },
  isCompleted: { type: Boolean, default: false },
  score: { type: Number, default: 0 },
});

const RoadmapSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  targetRole: { type: String },
  totalDurationWeeks: { type: Number },
  overview: {
    summary: String,
    skillsToDevelop: [String],
    technologiesToLearn: [String],
    prerequisites: [String],
  },
  phases: { type: [PhaseSchema], default: [] },
  applicationGuidance: {
    recommendedStartWeek: Number,
    whatToHaveReady: [String],
    howToApply: [String],
  },
  extraRecommendations: {
    learningResources: [
      {
        title: String,
        type: String,
        platform: String,
        url: String,
      },
    ],
    commonMistakes: [String],
    motivation: String,
  },
  // optional fields
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CareerRoadmap", RoadmapSchema);
