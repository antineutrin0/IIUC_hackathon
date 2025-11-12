// backend/src/models/resource.js
const mongoose = require('mongoose');

const COST = ['Free', 'Paid', 'Mixed'];

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  platform: { type: String, default: '' }, // e.g., YouTube, Coursera
  url: { type: String, required: true, trim: true },
  relatedSkills: {
    type: [String],
    default: [],
    set: arr => Array.from(new Set((arr || []).map(s => s.trim().toLowerCase()))),
  },
  cost: { type: String, enum: COST, default: 'Free' },
  description: { type: String, default: '' },
  createdBy: { type: String, default: 'seed' },
}, { timestamps: true });

ResourceSchema.index({ title: 'text', platform: 'text', description: 'text' });

module.exports = mongoose.model('Resource', ResourceSchema);
