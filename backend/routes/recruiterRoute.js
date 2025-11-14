import express from 'express';
import { RecruiterInfo } from '../models/recruiterInfoSchema.js';
import { User } from '../models/userModel.js';
import { Job } from '../models/jobModel.js';
import { isAuthenticated, authorizeUserType } from '../middleware/isAuthenticated.js';

const recruiterRouter = express.Router();

// GET /api/recruiter/profile - Get recruiter dashboard
recruiterRouter.get('/dashboard', isAuthenticated, authorizeUserType('recruiter'), async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'profile',
      populate: { path: 'postedJobs' }
    });
    
    if (!user.profile) {
      return res.status(404).json({ error: 'Recruiter profile not found' });
    }

    res.json({ success: true, profile: user.profile });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile', details: error.message });
  }
});

// POST /api/recruiter/profile - Create recruiter profile
recruiterRouter.post('/dashboard', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    // if (user.profile) {
    //   return res.status(400).json({ error: 'Recruiter profile already exists' });
    // }

    const { companyName, companyWebsite, companyLogo, dashboardNotes } = req.body;

    if (!companyName) {
      return res.status(400).json({ error: 'Company name is required' });
    }

    const profile = await RecruiterInfo.create({
      user:user._id,
      companyName,
      companyWebsite: companyWebsite || '',
      companyLogo: companyLogo || '',
      dashboardNotes: dashboardNotes || '',
    });

    // user.profile = profile._id;
    // user.profileModel = 'RecruiterProfile';
    // await user.save();

    res.status(201).json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create profile', details: error.message });
  }
});

// PUT /api/recruiter/profile - Update recruiter profile
recruiterRouter.put('/dashboard', isAuthenticated, authorizeUserType('recruiter'), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user.profile) {
      return res.status(404).json({ error: 'Profile not found. Create one first.' });
    }

    const updateData = {};
    if (req.body.companyName) updateData.companyName = req.body.companyName;
    if (req.body.companyWebsite !== undefined) updateData.companyWebsite = req.body.companyWebsite;
    if (req.body.companyLogo !== undefined) updateData.companyLogo = req.body.companyLogo;
    if (req.body.dashboardNotes !== undefined) updateData.dashboardNotes = req.body.dashboardNotes;

    const profile = await RecruiterInfo.findByIdAndUpdate(
      user.profile,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile', details: error.message });
  }
});

// GET /api/recruiter/jobs - Get all jobs posted by this recruiter
recruiterRouter.get('/jobs', isAuthenticated, authorizeUserType('recruiter'), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const profile = await RecruiterInfo.findById(user.profile).populate('postedJobs');
    
    if (!profile) {
      return res.status(404).json({ error: 'Recruiter profile not found' });
    }

    res.json({ success: true, jobs: profile.postedJobs });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs', details: error.message });
  }
});

// POST /api/recruiter/jobs - Post a new job
recruiterRouter.post('/jobs', isAuthenticated, authorizeUserType('recruiter'), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
     const profile = await RecruiterInfo.findOne({user:user._id});
    
    if (!profile) {
      return res.status(404).json({ error: 'Recruiter profile not found' });
    }
    const {
      title,
      company,
      location,
      requiredSkills,
      recommendedExperience,
      jobType,
      description,
      track,
      applyUrl,
      tags
    } = req.body;

    if (!title || !company || !location) {
      return res.status(400).json({ error: 'Title, company, and location are required' });
    }

    const job = await Job.create({
      title,
      company,
      location,
      requiredSkills: requiredSkills || [],
      recommendedExperience: recommendedExperience || 'Fresher',
      jobType: jobType || 'Full-time',
      description: description || '',
      track: track || '',
      applyUrl: applyUrl || '',
      tags: tags || [],
      createdBy: user._id.toString(),
    });
    const job_id=job._id.toString();
    profile.postedJobs.push(job_id);
    await profile.save();
    res.status(201).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create job', details: error.message });
  }
});

// PUT /api/recruiter/jobs/:id - Update a posted job
recruiterRouter.put('/jobs/:id', isAuthenticated, authorizeUserType('recruiter'), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const profile = await RecruiterInfo.findById(user.profile);
    
    if (!profile) {
      return res.status(404).json({ error: 'Recruiter profile not found' });
    }

    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Verify the job belongs to this recruiter
    if (!profile.postedJobs.includes(job._id)) {
      return res.status(403).json({ error: 'You can only update your own jobs' });
    }

    const updateData = {};
    if (req.body.title) updateData.title = req.body.title;
    if (req.body.company) updateData.company = req.body.company;
    if (req.body.location) updateData.location = req.body.location;
    if (req.body.requiredSkills) updateData.requiredSkills = req.body.requiredSkills;
    if (req.body.recommendedExperience) updateData.recommendedExperience = req.body.recommendedExperience;
    if (req.body.jobType) updateData.jobType = req.body.jobType;
    if (req.body.description !== undefined) updateData.description = req.body.description;
    if (req.body.track !== undefined) updateData.track = req.body.track;
    if (req.body.applyUrl !== undefined) updateData.applyUrl = req.body.applyUrl;
    if (req.body.tags) updateData.tags = req.body.tags;

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({ success: true, job: updatedJob });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update job', details: error.message });
  }
});

// DELETE /api/recruiter/jobs/:id - Delete a posted job
recruiterRouter.delete('/jobs/:id', isAuthenticated, authorizeUserType('recruiter'), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const profile = await RecruiterInfo.findById(user.profile);
    
    if (!profile) {
      return res.status(404).json({ error: 'Recruiter profile not found' });
    }

    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Verify the job belongs to this recruiter
    if (!profile.postedJobs.includes(job._id)) {
      return res.status(403).json({ error: 'You can only delete your own jobs' });
    }

    await Job.findByIdAndDelete(req.params.id);
    
    profile.postedJobs = profile.postedJobs.filter(
      jobId => jobId.toString() !== req.params.id
    );
    await profile.save();

    res.json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete job', details: error.message });
  }
});

export default recruiterRouter;