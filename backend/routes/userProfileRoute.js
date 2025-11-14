import express from 'express';
import { UserProfile } from '../models/userProfile.js';
import { User } from '../models/userModel.js';
import { isAuthenticated, authorizeUserType } from '../middleware/isAuthenticated.js';

const router = express.Router();

router.get('/me', isAuthenticated, async (req, res) => {
  console.log("Inside /me route, user:", req.user);
  if(!req.user){
    return res.status(401).json({
      success:false,
      message:"User not authenticated"
    })
  }
  return res.status(200).json({
    success:true,
    user:req.user
  })
} );

// GET /api/profile - Get logged-in user profile
router.get('/', isAuthenticated, async (req, res) => {

  console.log("Fetching profile for user:", req.user._id);
  try {
    const userProfile = await UserProfile.findOne({user: "69161ace3a9f55a0ca04b238"});
    
    if (!userProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json({ success: true, profile: userProfile });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile', details: error.message });
  }
});

// POST /api/profile - Create profile for general user
router.post('/', isAuthenticated, authorizeUserType('general'), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const userProfile = await UserProfile.findOne({ user: user._id });  

    if (userProfile) {
      return res.status(400).json({ error: 'Profile already exists' });
    }

    const profileData = {
      user: user._id,
      username: user.username,
      email: user.email,
      skills: req.body.skills || [],
      projects: req.body.projects || [],
      education: req.body.education || [],
      languages: req.body.languages || [],
      address: req.body.address || {},
      cvText: req.body.cvText || '',
      bio: req.body.bio || '',
      targetRoles: req.body.targetRoles || [],
      headline: req.body.headline || '',
      availability: req.body.availability || 'open_to_work',
      isPublic: req.body.isPublic || false,
    };

    const profile = await UserProfile.create(profileData);

    user.profile = profile._id;
    user.profileModel = 'UserProfile';
    await user.save();

    res.status(201).json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create profile', details: error.message });
  }
});

// PUT /api/profile - Update profile
router.put('/', isAuthenticated, authorizeUserType('general'), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
     const userProfile = await UserProfile.findOne({ user: user._id });  

    if (userProfile===null) {
      return res.status(404).json({ error: 'Profile not found. Create one first.' });
    }

    const updateData = {
      ...(req.body.skills && { skills: req.body.skills }),
      ...(req.body.projects && { projects: req.body.projects }),
      ...(req.body.education && { education: req.body.education }),
      ...(req.body.languages && { languages: req.body.languages }),
      ...(req.body.address && { address: req.body.address }),
      ...(req.body.cvText !== undefined && { cvText: req.body.cvText }),
      ...(req.body.bio !== undefined && { bio: req.body.bio }),
      ...(req.body.targetRoles && { targetRoles: req.body.targetRoles }),
      ...(req.body.headline !== undefined && { headline: req.body.headline }),
      ...(req.body.availability && { availability: req.body.availability }),
      ...(req.body.isPublic !== undefined && { isPublic: req.body.isPublic }),
      lastProfileUpdateAt: Date.now(),
    };

    const profile = await UserProfile.findByIdAndUpdate(
      user.profile,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile', details: error.message });
  }
});

// POST /api/profile/cv - Upload/save CV text
router.post('/cv', isAuthenticated, authorizeUserType('general'), async (req, res) => {
  try {
    const { cvText } = req.body;

    if (!cvText) {
      return res.status(400).json({ error: 'CV text is required' });
    }

    const user = await User.findById(req.user._id);
     const userProfile = await UserProfile.findOne({ user: user._id });  

    if (!userProfile) {
      return res.status(404).json({ error: 'Profile not found. Create one first.' });
    }

    const profile = await UserProfile.findByIdAndUpdate(
      user.profile,
      { cvText, lastProfileUpdateAt: Date.now() },
      { new: true }
    );

    res.json({ success: true, message: 'CV saved successfully', profile });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save CV', details: error.message });
  }
});

export default router;