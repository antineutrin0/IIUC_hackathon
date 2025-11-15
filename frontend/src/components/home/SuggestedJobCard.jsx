import axios from 'axios';
import { Briefcase, Clock, TrendingUp, MapPin, Target, CheckCircle2, Zap, Award } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const SuggestedJobCard = ({ job, matchDetails }) => {
  const [isApplied, setIsApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const navigate = useNavigate();

  const getTimeAgo = (date) => {
    const days = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  const handleApply = async (e) => {
    e.stopPropagation();
    
    if (isApplying || isApplied) return;

    setIsApplying(true);
    console.log("Applying for job:", job._id);

    try {
      const res = await axios.put(
        'http://localhost:8000/jobs/addjob',
        { jobId: job._id },
        {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log("Applied for job:", res.data);
      setIsApplied(true);
    } catch (error) {
      console.error("Error applying for job:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to apply for job");
    } finally {
      setIsApplying(false);
    }
  };

  const handleLearnMore = (e) => {
    e.stopPropagation();
    navigate(`/jobs/${job._id}`);
  };

  const handleCompare = (e) => {
    e.stopPropagation();
    navigate(`/compare/${job._id}`);
  };

  // Get match percentage color
  const getMatchColor = (score) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 50) return 'bg-blue-500';
    if (score >= 30) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 border-green-600">
      <div className="p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
              <Briefcase className="text-white" size={28} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-black text-xl mb-1 hover:text-green-600 transition-colors">
                {job.title}
              </h3>
              <p className="text-gray-600 text-base font-medium mb-2">{job.company}</p>
              <div className="flex flex-wrap gap-2">
                <span className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200">
                  <MapPin size={14} />
                  {job.location}
                </span>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
                  {job.jobType}
                </span>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-200">
                  {job.recommendedExperience}
                </span>
              </div>
            </div>
          </div>

          {/* Match Score Badge */}
          <div className="flex flex-col items-center gap-2">
            <div className={`relative w-20 h-20 rounded-full ${getMatchColor(job.matchScore)} flex items-center justify-center shadow-lg`}>
              <div className="absolute inset-1 bg-white rounded-full flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-800">{job.matchScore}%</span>
                <span className="text-xs text-gray-600 font-medium">Match</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-2 leading-relaxed">
          {job.description}
        </p>

        {/* Why Recommended Section */}
        {matchDetails && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-4 border border-green-200">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="text-green-600" size={20} />
              <h4 className="font-semibold text-gray-800 text-sm">Why This Job is Perfect For You</h4>
            </div>
            
            <div className="space-y-2">
              {/* Matching Skills */}
              {matchDetails.matchingSkills && matchDetails.matchingSkills.length > 0 && (
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <div className="flex-1">
                    <span className="text-sm text-gray-700 font-medium">
                      {matchDetails.matchingSkills.length} matching skill{matchDetails.matchingSkills.length !== 1 ? 's' : ''}:
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {matchDetails.matchingSkills.slice(0, 4).map((skill, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium capitalize">
                          {skill}
                        </span>
                      ))}
                      {matchDetails.matchingSkills.length > 4 && (
                        <span className="px-2 py-0.5 text-green-700 text-xs font-medium">
                          +{matchDetails.matchingSkills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Role Match */}
              {matchDetails.roleMatch && (
                <div className="flex items-start gap-2">
                  <Target className="text-blue-600 flex-shrink-0 mt-0.5" size={16} />
                  <span className="text-sm text-gray-700">
                    <span className="font-medium">Matches your target role</span> - Perfect alignment with your career goals
                  </span>
                </div>
              )}

              {/* Experience Match */}
              {matchDetails.experienceMatch && (
                <div className="flex items-start gap-2">
                  <Award className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                  <span className="text-sm text-gray-700">
                    <span className="font-medium">Experience level match</span> - Aligns with your current experience
                  </span>
                </div>
              )}

              {/* Location Match */}
              {matchDetails.locationMatch && (
                <div className="flex items-start gap-2">
                  <MapPin className="text-orange-600 flex-shrink-0 mt-0.5" size={16} />
                  <span className="text-sm text-gray-700">
                    <span className="font-medium">Great location</span> - {matchDetails.locationReason}
                  </span>
                </div>
              )}
            </div>

            {/* Relevance Bar */}
            <div className="mt-3 pt-3 border-t border-green-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-600">Overall Relevance</span>
                <span className="text-xs font-bold text-green-600">{job.matchScore}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getMatchColor(job.matchScore)} transition-all duration-500`}
                  style={{ width: `${job.matchScore}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Footer Section */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Clock size={16} />
              {getTimeAgo(job.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp size={16} />
              {job.track || 'General'}
            </span>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={handleCompare}
              className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium"
            >
              Compare
            </button>
            
            {isApplied ? (
              <button 
                className="px-5 py-2 bg-yellow-600 text-white rounded-lg cursor-not-allowed text-sm font-medium"
                disabled
              >
                Applied ✓
              </button>
            ) : (
              <button 
                onClick={handleApply} 
                className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                disabled={isApplying}
              >
                {isApplying ? 'Applying...' : 'Apply Now'}
              </button>
            )}
            
            <button 
              onClick={handleLearnMore}  
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedJobCard;