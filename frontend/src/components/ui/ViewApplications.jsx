import React, { useState, useEffect } from 'react';
import { Download, MoreVertical } from 'lucide-react';
import { mockAPI } from '../../lib/MockApi';

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const data = await mockAPI.fetchApplications();
      setApplications(data);
    } catch (error) {
      console.error('Error loading applications:', error);
      alert('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      await mockAPI.updateApplicationStatus(id, status);
      setApplications(applications.map(app => app.id === id ? { ...app, status } : app));
    } catch (error) {
      console.error('Error updating application status:', error);
      alert('Failed to update application status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'text-green-600 bg-green-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const downloadResume = (resumeUrl, userName) => {
    console.log('Downloading resume:', resumeUrl);
    alert(`Downloading resume for ${userName}`);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-center h-64 text-gray-500">
          Loading applications...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">View Applications</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">#</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">User name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Job Title</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Location</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Resume</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">No applications received yet</td>
              </tr>
            ) : (
              applications.map((app, index) => (
                <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-600">{index + 1}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {app.userAvatar}
                      </div>
                      <span className="text-gray-800">{app.userName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-800">{app.jobTitle}</td>
                  <td className="py-3 px-4 text-gray-600">{app.location}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => downloadResume(app.resumeUrl, app.userName)}
                      className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                    >
                      <span>Resume</span>
                      <Download size={16} />
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    {app.status === 'pending' ? (
                      <div className="relative group">
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical size={20} />
                        </button>
                        <div className="hidden group-hover:block absolute right-0 top-8 bg-white shadow-lg rounded-md py-1 z-10 min-w-[120px]">
                          <button
                            onClick={() => updateApplicationStatus(app.id, 'accepted')}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-green-600"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => updateApplicationStatus(app.id, 'rejected')}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ) : (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;
