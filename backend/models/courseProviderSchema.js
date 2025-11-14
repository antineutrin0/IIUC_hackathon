// models/CourseProvider.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const CourseProviderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  uploadedResources: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Resource', // assumes Resource model exists
    }
  ],

  bio: { type: String, default: '' },
  dashboardNotes: { type: String, default: '' },

}, { timestamps: true });

export const CourseProvider = mongoose.model('CourseProvider', CourseProviderSchema);
