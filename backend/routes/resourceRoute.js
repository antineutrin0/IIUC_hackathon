import express from 'express';
import { Resource } from '../models/resourceModel.js';
import { User } from '../models/userModel.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';

const resourceRoute = express.Router();

resourceRoute.post('/', isAuthenticated, async (req, res) => {
  try {
    const { title, platform, url, relatedSkills, cost, description } = req.body;

    if (!title || !url) {
      return res.status(400).json({ error: 'Title and URL are required.' });
    }

    const newResource = new Resource({
      title,
      platform,
      url,
      relatedSkills,
      cost,
      description,
      createdBy: req.user._id || 'admin', // ✅ the logged-in user
    });
    
    const CourseProvider=await User.findById(req.user._id).populate('courseProvider');
    if (CourseProvider && CourseProvider.courseProvider) {
      CourseProvider.uploadedResources.push(newResource._id);
      await CourseProvider.courseProvider.save();
    }
    
    const saved = await newResource.save();
    res.status(201).json({ success: true, resource: saved });

  } catch (error) {
    res.status(500).json({ error: 'Failed to create resource', details: error.message });
  }
});

// GET /api/resources - List all resources with filters
resourceRoute.get('/', async (req, res) => {
  try {
    const { skill, cost, platform, search, limit = 50, skip = 0 } = req.query;
    
    const query = {};
    
    if (skill) query.relatedSkills = skill.toLowerCase();
    if (cost) query.cost = cost;
    if (platform) query.platform = new RegExp(platform, 'i');
    if (search) {
      query.$text = { $search: search };
    }

    const resources = await Resource.find(query)
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ createdAt: -1 });

    const total = await Resource.countDocuments(query);

    res.json({ 
      success: true, 
      resources,
      pagination: {
        total,
        limit: parseInt(limit),
        skip: parseInt(skip),
        hasMore: total > parseInt(skip) + parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resources', details: error.message });
  }
});

// GET /api/resources/:id - Get resource details
resourceRoute.get('/:id', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    res.json({ success: true, resource });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resource', details: error.message });
  }
});

// GET /api/resources/recommend - Recommend resources for user
resourceRoute.get('/recommend', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('profile');
    
    if (!user.profile) {
      return res.status(400).json({ error: 'User profile not found. Create a profile first.' });
    }

    const userSkills = new Set((user.profile.skills || []).map(s => s.toLowerCase()));
    const targetRoles = (user.profile.targetRoles || []).map(r => r.toLowerCase());

    // Find resources matching user skills or target roles
    const allResources = await Resource.find().limit(100);
    
    const scoredResources = allResources.map(resource => {
      const resourceSkills = new Set(resource.relatedSkills || []);
      
      // Count matching skills
      let matchCount = 0;
      for (const skill of userSkills) {
        if (resourceSkills.has(skill)) matchCount++;
      }
      
      // Check if resource relates to target roles
      let roleMatch = false;
      for (const role of targetRoles) {
        if (resource.title.toLowerCase().includes(role) || 
            resource.description.toLowerCase().includes(role)) {
          roleMatch = true;
          break;
        }
      }

      const score = matchCount * 10 + (roleMatch ? 5 : 0);
      
      return {
        ...resource.toObject(),
        matchScore: score,
        matchedSkills: Array.from(userSkills).filter(s => resourceSkills.has(s))
      };
    });

    const recommendedResources = scoredResources
      .filter(r => r.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 20);

    res.json({ 
      success: true, 
      resources: recommendedResources,
      message: `Found ${recommendedResources.length} recommended resources based on your profile`
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to recommend resources', details: error.message });
  }
});

// POST /api/resources/:id/mark - Mark resource as completed/saved
resourceRoute.post('/:id/mark', isAuthenticated, async (req, res) => {
  try {
    const { status } = req.body; // 'completed' or 'saved'
    
    if (!['completed', 'saved'].includes(status)) {
      return res.status(400).json({ error: 'Status must be "completed" or "saved"' });
    }

    const resource = await Resource.findById(req.params.id);
    
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    // Here you would implement saving to user's profile or a separate collection
    // For now, just return success
    res.json({ 
      success: true, 
      message: `Resource marked as ${status}`,
      resource: {
        id: resource._id,
        title: resource.title,
        status
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark resource', details: error.message });
  }
});

export default resourceRoute;