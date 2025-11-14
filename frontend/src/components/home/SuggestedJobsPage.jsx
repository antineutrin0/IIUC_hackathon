import { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import SuggestedJobCard from "./SuggestedJobCard";
import SearchSection from "./SearchSection";
import { Filter, Sparkles, Target, TrendingUp } from "lucide-react";

const SuggestedJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchParams, setSearchParams] = useState({
    searchTerm: "",
    location: "",
  });
  
  const [currentPage, setCurrentPage] = useState(0);
  const jobsPerPage = 5;

  // Fetch user profile and all jobs
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('Please login to view suggested jobs');
        }

        // Fetch user profile
        const profileRes = await axios.get('http://localhost:8000/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const profile = profileRes.data.profile || profileRes.data;
        setUserProfile(profile);

        // Fetch all jobs
        const jobsRes = await axios.get('http://localhost:8000/jobs', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const allJobs = jobsRes.data.jobs || jobsRes.data;
        
        // Score and sort jobs based on user profile
        const scoredJobs = allJobs.map(job => {
          const matchData = calculateMatchScore(job, profile);
          return {
            ...job,
            matchScore: matchData.score,
            matchDetails: matchData.details
          };
        }).sort((a, b) => b.matchScore - a.matchScore);

        setJobs(scoredJobs);
        setFilteredJobs(scoredJobs);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load suggested jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate match score between job and user profile with detailed reasons
  const calculateMatchScore = (job, profile) => {
    let score = 0;
    const details = {
      matchingSkills: [],
      roleMatch: false,
      experienceMatch: false,
      locationMatch: false,
      locationReason: ''
    };

    const userSkills = new Set((profile.skills || []).map(s => s.toLowerCase()));
    const jobSkills = (job.requiredSkills || []).map(s => s.toLowerCase());
    
    // Skill matching (highest weight)
    const matchingSkills = jobSkills.filter(skill => userSkills.has(skill));
    details.matchingSkills = matchingSkills;
    score += matchingSkills.length * 10;

    // Track/Role matching
    const userRoles = (profile.targetRoles || []).map(r => r.toLowerCase());
    const jobTitle = (job.title || '').toLowerCase();
    const jobTrack = (job.track || '').toLowerCase();
    
    if (userRoles.some(role => jobTitle.includes(role) || jobTrack.includes(role))) {
      score += 15;
      details.roleMatch = true;
    }

    // Experience level matching
    const expRank = { Fresher: 0, Junior: 1, Mid: 2, Senior: 3 };
    const jobExp = job.recommendedExperience || 'Fresher';
    const userExp = profile.experienceLevel || 'Fresher';
    const expDiff = Math.abs(expRank[jobExp] - expRank[userExp]);
    
    if (expDiff === 0) {
      score += 10;
      details.experienceMatch = true;
    } else if (expDiff === 1) {
      score += 5;
      details.experienceMatch = true;
    } else {
      score -= 5;
    }

    // Location matching
    const userLocation = (profile.address?.city || '').toLowerCase();
    const jobLocation = (job.location || '').toLowerCase();
    
    if (jobLocation === 'remote') {
      score += 5;
      details.locationMatch = true;
      details.locationReason = 'Remote work available';
    } else if (userLocation && jobLocation.includes(userLocation)) {
      score += 8;
      details.locationMatch = true;
      details.locationReason = 'Located in your city';
    }

    // Availability matching
    if (profile.availability === 'open_to_work' || profile.availability === 'looking') {
      score += 3;
    }

    return {
      score: Math.max(0, Math.min(100, score)),
      details
    };
  };

  // Apply search filters
  useEffect(() => {
    let result = [...jobs];

    if (searchParams.searchTerm) {
      const term = searchParams.searchTerm.toLowerCase();
      result = result.filter(job =>
        job.title.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term) ||
        job.description.toLowerCase().includes(term) ||
        job.track.toLowerCase().includes(term)
      );
    }

    if (searchParams.location) {
      const loc = searchParams.location.toLowerCase();
      result = result.filter(job =>
        job.location.toLowerCase().includes(loc)
      );
    }

    setFilteredJobs(result);
    setCurrentPage(0);
  }, [searchParams, jobs]);

  // Pagination
  const pageCount = Math.ceil(filteredJobs.length / jobsPerPage);
  const displayedJobs = filteredJobs.slice(
    currentPage * jobsPerPage,
    (currentPage + 1) * jobsPerPage
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Calculate statistics
  const excellentMatches = filteredJobs.filter(j => j.matchScore >= 70).length;
  const goodMatches = filteredJobs.filter(j => j.matchScore >= 50 && j.matchScore < 70).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Analyzing your profile and finding perfect matches...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
        <div className="max-w-4xl mx-auto p-6 pt-20">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50">

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-full mb-4 shadow-lg">
              <Sparkles size={20} />
              <span className="font-semibold">AI-Powered Job Recommendations</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              Jobs Handpicked For You
            </h1>
            <p className="text-gray-600 text-lg">
              Based on your skills, experience, and career goals
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-green-600">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Target className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{filteredJobs.length}</p>
                  <p className="text-sm text-gray-600">Total Matches</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-blue-600">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{excellentMatches}</p>
                  <p className="text-sm text-gray-600">Excellent Matches (70%+)</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-purple-600">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Filter className="text-purple-600" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{goodMatches}</p>
                  <p className="text-sm text-gray-600">Good Matches (50-69%)</p>
                </div>
              </div>
            </div>
          </div>

          {/* User Profile Summary */}
          {userProfile && (
            <div className="bg-gradient-to-r from-white to-green-50 rounded-xl p-6 shadow-md border border-green-200">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Sparkles className="text-green-600" size={20} />
                Your Profile Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold text-green-600">Skills:</span>{' '}
                    {userProfile.skills?.length > 0 
                      ? userProfile.skills.slice(0, 5).join(', ') + (userProfile.skills.length > 5 ? '...' : '')
                      : 'No skills added yet'}
                  </p>
                </div>
                {userProfile.targetRoles?.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-blue-600">Target Roles:</span>{' '}
                      {userProfile.targetRoles.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Jobs List */}
        {displayedJobs.length === 0 ? (
          <div className="bg-white p-12 rounded-xl text-center shadow-md">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-gray-400" size={40} />
              </div>
              <p className="text-gray-500 text-lg mb-2">
                No matching jobs found
              </p>
              <p className="text-gray-400 text-sm">
                Try updating your profile with more skills or adjust your search criteria
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {displayedJobs.map((job) => (
              <SuggestedJobCard 
                key={job._id} 
                job={job}
                matchDetails={job.matchDetails}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="flex justify-center mt-10">
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              forcePage={currentPage}
              containerClassName={"flex space-x-2 text-gray-700 select-none"}
              pageClassName={"px-5 py-3 bg-white border border-gray-300 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors font-medium"}
              previousClassName={"px-5 py-3 bg-white border border-gray-300 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors font-medium"}
              nextClassName={"px-5 py-3 bg-white border border-gray-300 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors font-medium"}
              activeClassName={"bg-green-600 text-white border-green-600 hover:bg-green-600"}
              disabledClassName={"opacity-50 cursor-not-allowed hover:bg-white hover:border-gray-300"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestedJobsPage;