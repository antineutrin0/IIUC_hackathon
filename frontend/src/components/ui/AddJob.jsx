import React, { useState } from 'react';
import { mockAPI } from '../../lib/MockApi'; // We'll extract mockAPI to a separate file

const AddJob = ({ onJobAdded }) => {
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    category: 'Programming',
    location: 'Bangalore',
    level: 'Beginner level',
    salary: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newJob = await mockAPI.addJob(jobData);
      alert('Job posted successfully!');
      setJobData({
        title: '',
        description: '',
        category: 'Programming',
        location: 'Bangalore',
        level: 'Beginner level',
        salary: ''
      });
      if (onJobAdded) onJobAdded(newJob);
    } catch (error) {
      console.error('Error adding job:', error);
      alert('Failed to add job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Add New Job</h2>
      <div className="space-y-6">
        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
          <input
            type="text"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            placeholder="Type here"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Job Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
          <textarea
            name="description"
            value={jobData.description}
            onChange={handleChange}
            rows="6"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none"
            required
          />
        </div>

        {/* Category, Location, Level */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Category</label>
            <select
              name="category"
              value={jobData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Programming</option>
              <option>Design</option>
              <option>Marketing</option>
              <option>Sales</option>
              <option>Management</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Location</label>
            <select
              name="location"
              value={jobData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Bangalore</option>
              <option>Mumbai</option>
              <option>New York</option>
              <option>California</option>
              <option>Chennai</option>
              <option>Washington</option>
              <option>Hyderabad</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Level</label>
            <select
              name="level"
              value={jobData.level}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Beginner level</option>
              <option>Intermediate level</option>
              <option>Expert level</option>
            </select>
          </div>
        </div>

        {/* Salary */}
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-2">Job Salary</label>
          <input
            type="number"
            name="salary"
            value={jobData.salary}
            onChange={handleChange}
            placeholder="2500"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding...' : 'ADD'}
        </button>
      </div>
    </div>
  );
};

export default AddJob;
