import express from 'express';
import { RecruiterInfo } from '../models/recruiterInfoSchema.js';

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

export default testroute;