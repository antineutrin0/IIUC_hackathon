// backend/src/models/profile.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const EducationSchema = new Schema({
  institution: { type: String, trim: true, default: '' },
  degree: { type: String, trim: true, default: '' },
  fieldOfStudy: { type: String, trim: true, default: '' },
  startYear: { type: Number },
  endYear: { type: Number },
  grade: { type: String, trim: true, default: '' },
}, { _id: false });

const LanguageSchema = new Schema({
  name: { type: String, required: true, trim: true },
  proficiency: {
    type: String,
    enum: ['Basic', 'Conversational', 'Fluent', 'Native'],
    default: 'Conversational',
  },
}, { _id: false });

const AddressSchema = new Schema({
  country: { type: String, trim: true, default: '' },
  state: { type: String, trim: true, default: '' },
  city: { type: String, trim: true, default: '' },
  street: { type: String, trim: true, default: '' },
  postalCode: { type: String, trim: true, default: '' },
}, { _id: false });

const ProjectSchema = new Schema({
  title: { type: String, trim: true, required: true },
  description: { type: String, default: '' },
  link: { type: String, default: '' },
  techStack: { type: [String], default: [], set: arr => Array.from(new Set((arr || []).map(s => s.trim().toLowerCase()))) },
  startDate: { type: Date },
  endDate: { type: Date },
  isOngoing: { type: Boolean, default: false },
}, { _id: false });

const ProfileSchema = new Schema({
  skills: { type: [String], default: [], set: arr => Array.from(new Set((arr || []).map(s => s.trim().toLowerCase()))) },
  projects: { type: [ProjectSchema], default: [] },
  education: { type: [EducationSchema], default: [] },
  languages: { type: [LanguageSchema], default: [] },
  address: { type: AddressSchema, default: () => ({}) },
  cvText: { type: String, default: '' },
  bio: { type: String, default: '' },
  targetRoles: { type: [String], default: [], set: arr => Array.from(new Set((arr || []).map(s => s.trim()))) },
  headline: { type: String, default: '' },
  isPublic: { type: Boolean, default: false },
  availability: {
    type: String,
    enum: ['student', 'employed', 'unemployed', 'looking', 'open_to_work', 'not_looking'],
    default: 'open_to_work',
  },
  lastProfileUpdateAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const Profile = mongoose.model('Profile', ProfileSchema);
