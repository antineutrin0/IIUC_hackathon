import express from 'express';
import { Job } from '../models/jobModel.js';
import { User } from '../models/userModel.js';
import { authorizeUserType, isAuthenticated } from '../middleware/isAuthenticated.js';
import { UserProfile } from '../models/userProfile.js';

const jobRoute = express.Router();

// GET /api/jobs - List all jobs with filters
jobRoute.get('/', async (req, res) => {
  try {
    const { track, location, type, search, limit = 50, skip = 0 } = req.query;
    
    const query = {};
    
    if (track) query.track = new RegExp(track, 'i');
    if (location) query.location = new RegExp(location, 'i');
    if (type) query.jobType = type;
    if (search) {
      query.$text = { $search: search };
    }

    const jobs = await Job.find(query)
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ createdAt: -1 });

    const total = await Job.countDocuments(query);

    res.json({ 
      success: true, 
      jobs, 
      pagination: {
        total,
        limit: parseInt(limit),
        skip: parseInt(skip),
        hasMore: total > parseInt(skip) + parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs', details: error.message });
  }
});

// GET /api/jobs/:id - Get job details
jobRoute.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    console.log("Fetched job:", job);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json({ success: true, job });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch job', details: error.message });
  }
});

jobRoute.put('/addjob', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
     const userProfile = await UserProfile.findOne({ user: user._id });  
     const {jobId} = req.body;
     console.log("form router",jobId,userProfile);
     userProfile.appliedJobs.push(jobId);
    if (userProfile===null) {
      return res.status(404).json({ error: 'Profile not found. Create one first.' });
    }
    await userProfile.save();
    res.json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile', details: error.message });
  }
});

// GET /api/jobs/recommend - Recommend jobs for logged-in user
jobRoute.get('/recommend', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const userProfile = await UserProfile.findOne({ user: user._id });
    if (!userProfile) {
      return res.status(400).json({ error: 'User profile not found. Create a profile first.' });
    }

    const allJobs = await Job.find().limit(100);
    
    // Create user object for scoring
    const userForScoring = {
      profile: {
        skills: user.profile.skills || []
      },
      preferredTrack: user.profile.targetRoles?.[0] || '',
      experienceLevel: 'Fresher' // You might want to add this field to UserProfile
    };

    // Score all jobs
    const scoredJobs = allJobs.map(job => {
      const scoreData = job.scoreForUser(userForScoring);
      return {
        ...job.toObject(),
        matchScore: scoreData.score,
        matchedSkills: scoreData.matches
      };
    });

    // Sort by score and filter out low scores
    const recommendedJobs = scoredJobs
      .filter(job => job.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 20);

    res.json({ 
      success: true, 
      jobs: recommendedJobs,
      message: `Found ${recommendedJobs.length} recommended jobs based on your profile`
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to recommend jobs', details: error.message });
  }
});

// POST /api/jobs/:id/apply - Apply to a job (placeholder)
jobRoute.post('/:id/apply', isAuthenticated, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Here you would implement application logic
    // For now, just return success
    res.json({ 
      success: true, 
      message: 'Application submitted successfully',
      job: {
        id: job._id,
        title: job.title,
        company: job.company
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to apply', details: error.message });
  }
});

export default jobRoute;