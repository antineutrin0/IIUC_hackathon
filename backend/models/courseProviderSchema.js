// models/CourseProvider.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const CourseProviderSchema = new Schema({
  // reference to the User
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // reference to the resources uploaded by the user
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
