import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDown, Sparkles, BookOpen, TrendingUp, Award, Brain } from "lucide-react";
import SuggestedResourceCard from "./SuggestedResourceCard";

const SuggestedResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);
  const [sortBy, setSortBy] = useState('Best Match');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile and all resources
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('Please login to view suggested resources');
        }

        // Fetch user profile
        const profileRes = await axios.get('http://localhost:8000/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const profile = profileRes.data.profile || profileRes.data;
        setUserProfile(profile);

        // Fetch all resources
        const resourcesRes = await axios.get('http://localhost:8000/resource', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const allResources = resourcesRes.data.resources || resourcesRes.data;
        
        // Score and sort resources based on user profile
        const scoredResources = allResources.map(resource => {
          const matchData = calculateMatchScore(resource, profile);
          return {
            ...resource,
            matchScore: matchData.score,
            matchDetails: matchData.details
          };
        }).sort((a, b) => b.matchScore - a.matchScore);

        setResources(scoredResources);
        setFilteredResources(scoredResources);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load suggested resources');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate match score between resource and user profile with detailed reasons
  const calculateMatchScore = (resource, profile) => {
    let score = 0;
    const details = {
      improvementSkills: [],
      newSkills: [],
      careerMatch: false,
      educationMatch: false,
      projectMatch: false
    };

    const userSkills = new Set((profile.skills || []).map(s => s.toLowerCase()));
    const resourceSkills = (resource.relatedSkills || []).map(s => s.toLowerCase());
    
    // Skill matching - resources that match user's existing skills (for improvement)
    const matchingSkills = resourceSkills.filter(skill => userSkills.has(skill));
    details.improvementSkills = matchingSkills;
    score += matchingSkills.length * 8;

    // Skills to learn - resources with new skills user doesn't have yet
    const newSkills = resourceSkills.filter(skill => !userSkills.has(skill));
    details.newSkills = newSkills.slice(0, 5); // Limit to 5 for display
    score += newSkills.length * 5;

    // Target roles matching
    const userRoles = (profile.targetRoles || []).map(r => r.toLowerCase());
    const resourceTitle = (resource.title || '').toLowerCase();
    const resourceDesc = (resource.description || '').toLowerCase();
    
    if (userRoles.some(role => 
      resourceTitle.includes(role) || 
      resourceDesc.includes(role) ||
      resourceSkills.some(skill => role.includes(skill))
    )) {
      score += 12;
      details.careerMatch = true;
    }

    // Education field matching
    const educationFields = (profile.education || [])
      .map(edu => (edu.fieldOfStudy || '').toLowerCase())
      .filter(Boolean);
    
    if (educationFields.some(field => 
      resourceTitle.includes(field) || 
      resourceSkills.some(skill => field.includes(skill))
    )) {
      score += 10;
      details.educationMatch = true;
    }

    // Project tech stack matching
    const projectTechStack = new Set(
      (profile.projects || [])
        .flatMap(proj => proj.techStack || [])
        .map(tech => tech.toLowerCase())
    );
    
    const techMatches = resourceSkills.filter(skill => projectTechStack.has(skill));
    if (techMatches.length > 0) {
      score += techMatches.length * 6;
      details.projectMatch = true;
    }

    // Prefer free resources if user is a student or unemployed
    if ((profile.availability === 'student' || profile.availability === 'unemployed') && 
        resource.cost === 'Free') {
      score += 5;
    }

    return {
      score: Math.max(0, Math.min(100, score)),
      details
    };
  };

  // Apply sorting
  useEffect(() => {
    let result = [...resources];

    if (sortBy === 'Best Match') {
      result.sort((a, b) => b.matchScore - a.matchScore);
    } else if (sortBy === 'Free First') {
      result.sort((a, b) => {
        if (a.cost === 'Free' && b.cost !== 'Free') return -1;
        if (a.cost !== 'Free' && b.cost === 'Free') return 1;
        return b.matchScore - a.matchScore;
      });
    } else if (sortBy === 'Newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredResources(result);
  }, [sortBy, resources]);

  // Calculate statistics
  const excellentMatches = filteredResources.filter(r => r.matchScore >= 60).length;
  const goodMatches = filteredResources.filter(r => r.matchScore >= 40 && r.matchScore < 60).length;
  const freeResources = filteredResources.filter(r => r.cost === 'Free').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Analyzing your learning path and finding perfect resources...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50">
        <div className="max-w-4xl mx-auto p-6 pt-20">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedResource) {
    return (
      <CourseDetailsPage 
        resource={selectedResource} 
        onBack={() => setSelectedResource(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full mb-4 shadow-lg">
              <Brain size={20} />
              <span className="font-semibold">AI-Powered Learning Recommendations</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              Your Personalized Learning Path
            </h1>
            <p className="text-gray-600 text-lg">
              Curated resources to help you grow and achieve your career goals
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-blue-600">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookOpen className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{filteredResources.length}</p>
                  <p className="text-sm text-gray-600">Total Resources</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-green-600">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{excellentMatches}</p>
                  <p className="text-sm text-gray-600">Excellent Matches (60%+)</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-purple-600">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Award className="text-purple-600" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{goodMatches}</p>
                  <p className="text-sm text-gray-600">Good Matches (40-59%)</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-yellow-600">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Sparkles className="text-yellow-600" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{freeResources}</p>
                  <p className="text-sm text-gray-600">Free Resources</p>
                </div>
              </div>
            </div>
          </div>

          {/* User Profile Summary */}
          {userProfile && (
            <div className="bg-gradient-to-r from-white to-blue-50 rounded-xl p-6 shadow-md border border-blue-200 mb-6">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Sparkles className="text-blue-600" size={20} />
                Your Learning Profile
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold text-blue-600">Current Skills:</span>{' '}
                    {userProfile.skills?.length > 0 
                      ? userProfile.skills.slice(0, 4).join(', ') + (userProfile.skills.length > 4 ? '...' : '')
                      : 'No skills added yet'}
                  </p>
                </div>
                {userProfile.targetRoles?.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-purple-600">Career Goals:</span>{' '}
                      {userProfile.targetRoles.join(', ')}
                    </p>
                  </div>
                )}
                {userProfile.education?.length > 0 && userProfile.education[0].fieldOfStudy && (
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-green-600">Study Field:</span>{' '}
                      {userProfile.education[0].fieldOfStudy}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Sorting Controls */}
          <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-blue-50 border border-blue-300 rounded-lg px-4 py-2 pr-10 text-gray-800 cursor-pointer font-medium hover:bg-blue-100 transition-colors"
                >
                  <option>Best Match</option>
                  <option>Free First</option>
                  <option>Newest</option>
                </select>
                <ChevronDown 
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-blue-600" 
                  size={20} 
                />
              </div>
            </div>
            
            <span className="text-gray-700 font-medium">
              {filteredResources.length} resources found
            </span>
          </div>
        </div>

        {/* Resources List */}
        <div className="space-y-6">
          {filteredResources.length === 0 ? (
            <div className="bg-white p-12 rounded-xl text-center shadow-md">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="text-gray-400" size={40} />
                </div>
                <p className="text-gray-500 text-lg mb-2">
                  No matching resources found
                </p>
                <p className="text-gray-400 text-sm">
                  Try adding more skills to your profile or adjust your filters
                </p>
              </div>
            </div>
          ) : (
            filteredResources.map(resource => (
              <SuggestedResourceCard
                key={resource._id}
                resource={resource}
                matchDetails={resource.matchDetails}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SuggestedResourcesPage;