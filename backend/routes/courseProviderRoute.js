import express from 'express';
import { CourseProvider } from '../models/courseProviderSchema.js';
import { Resource } from '../models/resourceModel.js';
import { User } from '../models/userModel.js';
import { isAuthenticated, authorizeUserType } from '../middleware/isAuthenticated.js';

const courseProviderRoute = express.Router();

// GET /api/resource/profile - Get resource sharer dashboard
courseProviderRoute.get('/profile', isAuthenticated, authorizeUserType('course_provider'), async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'profile',
      populate: { path: 'uploadedResources' }
    });
    
    if (!user.profile) {
      return res.status(404).json({ error: 'Resource sharer profile not found' });
    }

    res.json({ success: true, profile: user.profile });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile', details: error.message });
  }
});

// POST /api/resource/profile - Create resource sharer profile
courseProviderRoute.post('/profile', isAuthenticated, authorizeUserType('course_provider'), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (user.profile) {
      return res.status(400).json({ error: 'Resource sharer profile already exists' });
    }

    const { bio, dashboardNotes } = req.body;

    const profile = await CourseProvider.create({
      user: user._id,
      bio: bio || '',
      dashboardNotes: dashboardNotes || '',
    });

    user.profile = profile._id;
    user.profileModel = 'ResourceProfile';
    await user.save();

    res.status(201).json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create profile', details: error.message });
  }
});

// PUT /api/resource/profile - Update dashboard
courseProviderRoute.put('/profile', isAuthenticated, authorizeUserType('course_provider'), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user.profile) {
      return res.status(404).json({ error: 'Profile not found. Create one first.' });
    }

    const updateData = {};
    if (req.body.bio !== undefined) updateData.bio = req.body.bio;
    if (req.body.dashboardNotes !== undefined) updateData.dashboardNotes = req.body.dashboardNotes;

    const profile = await CourseProvider.findByIdAndUpdate(
      user.profile,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile', details: error.message });
  }
});

// GET /api/resource/resources - Get all resources uploaded by this user
courseProviderRoute.get('/resources', isAuthenticated, authorizeUserType('course_provider'), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const profile = await CourseProvider.findById(user.profile).populate('uploadedResources');
    
    if (!profile) {
      return res.status(404).json({ error: 'Resource sharer profile not found' });
    }

    res.json({ success: true, resources: profile.uploadedResources });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resources', details: error.message });
  }
});

// POST /api/resource/resources - Upload new resource
courseProviderRoute.post('/resources', isAuthenticated, authorizeUserType('course_provider'), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const profile = await CourseProvider.findById(user.profile);
    
    if (!profile) {
      return res.status(404).json({ error: 'Resource sharer profile not found' });
    }

    const { title, platform, url, relatedSkills, cost, description } = req.body;

    if (!title || !url) {
      return res.status(400).json({ error: 'Title and URL are required' });
    }

    const resource = await Resource.create({
      title,
      platform: platform || '',
      url,
      relatedSkills: relatedSkills || [],
      cost: cost || 'Free',
      description: description || '',
      createdBy: user._id.toString(),
    });

    profile.uploadedResources.push(resource._id);
    await profile.save();

    res.status(201).json({ success: true, resource });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create resource', details: error.message });
  }
});

// PUT /api/resource/resources/:id - Update resource info
courseProviderRoute.put('/resources/:id', isAuthenticated, authorizeUserType('course_provider'), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const profile = await CourseProvider.findById(user.profile);
    
    if (!profile) {
      return res.status(404).json({ error: 'Resource sharer profile not found' });
    }

    const resource = await Resource.findById(req.params.id);
    
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    // Verify the resource belongs to this user
    if (!profile.uploadedResources.includes(resource._id)) {
      return res.status(403).json({ error: 'You can only update your own resources' });
    }

    const updateData = {};
    if (req.body.title) updateData.title = req.body.title;
    if (req.body.platform !== undefined) updateData.platform = req.body.platform;
    if (req.body.url) updateData.url = req.body.url;
    if (req.body.relatedSkills) updateData.relatedSkills = req.body.relatedSkills;
    if (req.body.cost) updateData.cost = req.body.cost;
    if (req.body.description !== undefined) updateData.description = req.body.description;

    const updatedResource = await Resource.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({ success: true, resource: updatedResource });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update resource', details: error.message });
  }
});

// DELETE /api/resource/resources/:id - Delete resource
courseProviderRoute.delete('/resources/:id', isAuthenticated, authorizeUserType('course_provider'), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const profile = await CourseProvider.findById(user.profile);
    
    if (!profile) {
      return res.status(404).json({ error: 'Resource sharer profile not found' });
    }

    const resource = await Resource.findById(req.params.id);
    
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    // Verify the resource belongs to this user
    if (!profile.uploadedResources.includes(resource._id)) {
      return res.status(403).json({ error: 'You can only delete your own resources' });
    }

    await Resource.findByIdAndDelete(req.params.id);
    
    profile.uploadedResources = profile.uploadedResources.filter(
      resourceId => resourceId.toString() !== req.params.id
    );
    await profile.save();

    res.json({ success: true, message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete resource', details: error.message });
  }
});

export default courseProviderRoute;