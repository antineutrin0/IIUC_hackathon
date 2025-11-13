import React, { useState } from 'react';
import { Plus, Briefcase, Users } from 'lucide-react';
import AddJob from './AddJob';
// import ManageJobs from './ManageJobs';
import ViewApplications from './ViewApplications';

const RecruiterDashboard = () => {
  const [activeTab, setActiveTab] = useState('add-job');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white h-screen shadow-lg fixed left-0 top-0">
          <div className="p-6">
            <h1 className='font-bold text-xl mb-8'>
                        <span className='text-green-600'>Next</span>Step
                    </h1>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('add-job')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'add-job' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Plus className="text-green-600"size={20} />
                <span className="font-medium text-green-600">Add Job</span>
              </button>

              <button
                onClick={() => setActiveTab('manage-jobs')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'manage-jobs' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Briefcase className="text-green-600" size={20} />
                <span className="font-medium text-green-600">Manage Jobs</span>
              </button>

              <button
                onClick={() => setActiveTab('view-applications')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'view-applications' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Users className="text-green-600" size={20} />
                <span className="font-medium text-green-600">View Applications</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'add-job' && <AddJob />}
            {/* {/* {activeTab === 'manage-jobs' && <ManageJobs />} */}
            {activeTab === 'view-applications' && <ViewApplications />} 
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
