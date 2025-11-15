import axios from 'axios';
import { Briefcase, Clock, TrendingUp } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
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
    e.stopPropagation(); // Prevent event bubbling
    
    if (isApplying || isApplied) return; // Prevent multiple clicks
    
    try {
      setIsApplied(true);
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
      
    } catch (error) {
      console.error("Error applying for job:", error.response?.data || error.message);
      // alert(error.response?.data?.message || "Failed to apply for job");
    } 
  };

  const handleLearnMore = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    navigate(`/jobs/${job._id}`);
  };

  const handleCompare = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    navigate(`/compare/${job._id}`);
  };

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      {/* Compare button */}
      <button
        className="absolute top-5 right-5 flex items-center gap-1 text-gray-600 text-sm hover:text-green-700 hover:underline transition-colors"
        onClick={handleCompare}
      >
        <TrendingUp size={16} /> Compare & Improve
      </button>

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
            <Briefcase className="text-green-600" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-black text-lg">{job.title}</h3>
            <p className="text-gray-600 text-sm">{job.company}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
          {job.location}
        </span>
        <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
          {job.recommendedExperience}
        </span>
      </div>

      <p className="text-gray-700 text-sm mb-4 line-clamp-2">{job.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Clock size={16} />
            {job.jobType}
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp size={16} />
            {getTimeAgo(job.createdAt)}
          </span>
        </div>

        <div className="flex gap-2">
          {isApplied ? (
            <button 
              className="px-4 py-2 bg-yellow-600 text-white rounded-md cursor-not-allowed text-sm font-medium"
              disabled
            >
              Applied
            </button>
          ) : (
            <button 
              onClick={handleApply} 
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isApplying}
            >
              {isApplying ? 'Applying...' : 'Apply now'}
            </button>
          )}
          <button 
            onClick={handleLearnMore}  
            className="px-4 py-2 border border-gray-300 text-black rounded-md hover:bg-gray-50 transition-colors text-sm"
          >
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;