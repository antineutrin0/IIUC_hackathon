import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RoadmapPopup = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const [targetRole, setTargetRole] = useState('');
  const [timeframe, setTimeframe] = useState('3');

  const handleCreateRoadmap = () => {
    if (targetRole.trim()) {
      alert(`Creating roadmap for ${targetRole} with ${timeframe} months timeframe`);
      navigate("/home"); // redirect after creating roadmap
    } else {
      alert('Please enter a target role');
    }
  };

  const handleClose = () => {
    // 👇 Redirect to / instead of just closing
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          {/* Backdrop → clicking = redirect to /home */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          ></div>

          {/* Modal */}
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8"
            onClick={(e) => e.stopPropagation()} // stop redirect when clicking inside
          >

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Roadmap</h2>
              <p className="text-gray-600 text-sm">
                Set your goals and let’s build your learning path
              </p>
            </div>

            {/* Form */}
            <div className="space-y-5">

              <div>
                <label className="block text-sm font-semibold mb-2">Target Role</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g., Frontend Developer"
                  className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Timeframe</label>
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-emerald-500"
                >
                  <option value="3">3 months</option>
                  <option value="6">6 months</option>
                  <option value="9">9 months</option>
                  <option value="12">12 months</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleClose}
                  className="flex-1 border border-gray-400 py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  onClick={handleCreateRoadmap}
                  className="flex-1 bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600"
                >
                  Create My Roadmap
                </button>
              </div>
            </div>

            {/* Suggestions */}
            <div className="mt-6 pt-4 border-t">
              <p className="text-xs text-gray-500 mb-2">Popular Roles:</p>
              <div className="flex flex-wrap gap-2">
                {['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Data Scientist']
                  .map((role) => (
                    <button
                      key={role}
                      onClick={() => setTargetRole(role)}
                      className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
                    >
                      {role}
                    </button>
                  ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default RoadmapPopup;
