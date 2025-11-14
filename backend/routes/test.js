import express from 'express';
import { RecruiterInfo } from '../models/recruiterInfoSchema.js';
import multer from 'multer';
import cloudinary from 'cloudinary';

const testroute = express.Router();


testroute.post('/testjob', async(req,res)=>{
    const profile= await RecruiterInfo.findById('6914d04621e40430f78dfc8e');
   const job={
        _id:'6914d04621e40430f78dfc8f',
        title: 'Sample Job',
        company: 'Sample Company',
   }
   console.log(job._id);
    profile.postedJobs.push(job._id);
    await profile.save();
    res.json({success:true,profile});
}
)

const upload = multer({ storage: multer.memoryStorage() });

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// POST /upload
testroute.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      { folder: "uploads" },
      (error, uploadResult) => {
        if (error) {
          return res.status(500).json({ error });
        }
        return res.json({ url: uploadResult.secure_url });
      }
    );

    // Write the buffer to the upload stream
    result.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default testroute;