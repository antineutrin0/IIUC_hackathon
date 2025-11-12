// backend/src/models/job.js
import mongoose from 'mongoose';

const EXPERIENCE = ['Fresher', 'Junior', 'Mid', 'Senior'];
const JOB_TYPES = ['Internship', 'Part-time', 'Full-time', 'Freelance'];

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true }, // 'Remote' allowed
  requiredSkills: {
    type: [String], 
    default: [],
    set: arr => Array.from(new Set((arr || []).map(s => s.trim().toLowerCase()))), // normalized
  },
  recommendedExperience: { type: String, enum: EXPERIENCE, default: 'Fresher' },
  jobType: { type: String, enum: JOB_TYPES, default: 'Full-time' },
  description: { type: String, default: '' },
  track: { type: String, default: '' }, // e.g., Web Development, Data
  // optionally a URL to apply
  applyUrl: { type: String, default: '' },
  // tags for quick filtering
  tags: { type: [String], default: [] },
  createdBy: { type: String, default: 'seed' },
}, { timestamps: true });

JobSchema.index({ title: 'text', company: 'text', description: 'text' });
JobSchema.index({ track: 1 });
JobSchema.index({ jobType: 1 });

JobSchema.methods.scoreForUser = function (user) {
  // user: object with .profile.skills (array), .preferredTrack, .experienceLevel
  const expRank = {Fresher:0, Junior:1, Mid:2, Senior:3};
  const jobExp = this.recommendedExperience || 'Fresher';
  const userExp = user.experienceLevel || 'Fresher';
  const userSkills = new Set((user.profile?.skills || []).map(s => s.toLowerCase()));
  const common = (this.requiredSkills || []).filter(s => userSkills.has(s));
  let score = common.length * 10;
  if (this.track && user.preferredTrack && this.track.toLowerCase() === user.preferredTrack.toLowerCase()) score += 5;
  const diff = expRank[jobExp] - expRank[userExp];
  if (diff > 1) score -= 5; 
  return {
    score,
    matches: common,
  };
};

export const Job = mongoose.model('Job', JobSchema);