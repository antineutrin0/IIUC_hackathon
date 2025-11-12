
import mongoose from "mongoose";
const { Schema } = mongoose;

const RecruiterInfoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  companyName: { type: String, required: true },
  companyWebsite: { type: String, default: '' },
  companyLogo: { type: String, default: '' },

  postedJobs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Job',
    }
  ],

  dashboardNotes: { type: String, default: '' },

}, { timestamps: true });

export const RecruiterInfo = mongoose.model('RecruiterInfo', RecruiterInfoSchema);
