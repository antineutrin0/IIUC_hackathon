import { Briefcase, Clock, TrendingUp } from 'lucide-react';
import React from 'react';

const JobCard = ({ job, onClick }) => {
  const getTimeAgo = (date) => {
    const days = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  return (
    <div
      onClick={() => onClick(job)}
      className="relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
    >
      {/* New top-left navigation button */}
      <button
        className="absolute top-5 right-5 flex items-center gap-1 text-gray-600 text-1xl hover:text-green-700 hover:underline transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          console.log('Navigate button clicked');
        }}
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
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium">
            Apply now
          </button>
          <button className="px-4 py-2 border border-gray-300 text-black rounded-md hover:bg-gray-50 transition-colors text-sm">
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
};
export default JobCard;