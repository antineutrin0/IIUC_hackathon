import React, { useState, useEffect } from 'react';
import { mockAPI } from '../../lib/MockApi';

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await mockAPI.fetchJobs();
      setJobs(data);
    } catch (error) {
      console.error('Error loading jobs:', error);
      alert('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async (id) => {
    const job = jobs.find(j => j.id === id);
    if (!job) return;

    try {
      await mockAPI.updateJobVisibility(id, !job.visible);
      setJobs(jobs.map(j => j.id === id ? { ...j, visible: !j.visible } : j));
    } catch (error) {
      console.error('Error updating job visibility:', error);
      alert('Failed to update job visibility');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-center h-64 text-gray-500">
          Loading jobs...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Manage Jobs</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">#</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Job Title</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Location</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Applicants</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Visible</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">No jobs posted yet</td>
              </tr>
            ) : (
              jobs.map((job, index) => (
                <tr key={job.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-600">{index + 1}</td>
                  <td className="py-3 px-4 text-gray-800">{job.title}</td>
                  <td className="py-3 px-4 text-gray-600">{formatDate(job.date)}</td>
                  <td className="py-3 px-4 text-gray-600">{job.location}</td>
                  <td className="py-3 px-4 text-gray-600">{job.applicants}</td>
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={job.visible}
                      onChange={() => toggleVisibility(job.id)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
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

export default ManageJobs;
