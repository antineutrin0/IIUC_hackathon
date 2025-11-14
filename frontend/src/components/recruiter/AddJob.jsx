import React, { useState } from "react";
import { mockAPI } from "./jobMockApi";
import axios from "axios";

const AddJob = ({ onJobAdded }) => {
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "Bangalore",
    requiredSkills: "",
    recommendedExperience: "Fresher",
    jobType: "Full-time",
    description: "",
    track: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formattedData = {
        ...jobData,
        requiredSkills: jobData.requiredSkills
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s),
      };
      console.log("Submitting job data:", formattedData);

    const res = await axios.post(
    "http://localhost:8000/recruiter/jobs",
    formattedData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );

  const data = res.data; 
  console.log("Job added:", data);
      

      alert("✅ Job posted successfully!");
      setJobData({
        title: "",
        company: "",
        location: "Bangalore",
        requiredSkills: "",
        recommendedExperience: "Fresher",
        jobType: "Full-time",
        description: "",
        track: "",
      });
      if (onJobAdded) onJobAdded(newJob);
    } catch (error) {
      console.error("Error adding job:", error);
      alert("❌ Failed to add job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-green-50 rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Add New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Title
          </label>
          <input
            type="text"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name
          </label>
          <input
            type="text"
            name="company"
            value={jobData.company}
            onChange={handleChange}
            placeholder="e.g. Google"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={jobData.description}
            onChange={handleChange}
            rows="6"
            placeholder="Describe the job responsibilities..."
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Track & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Track / Domain
            </label>
            <input
              type="text"
              name="track"
              value={jobData.track}
              onChange={handleChange}
              placeholder="e.g. Web Development, Data Science"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <select
              name="location"
              value={jobData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option>Bangalore</option>
              <option>Mumbai</option>
              <option>New York</option>
              <option>California</option>
              <option>Remote</option>
              <option>Chennai</option>
              <option>Hyderabad</option>
            </select>
          </div>
        </div>

        {/* Required Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Required Skills (comma separated)
          </label>
          <input
            type="text"
            name="requiredSkills"
            value={jobData.requiredSkills}
            onChange={handleChange}
            placeholder="e.g. React, Node.js, MongoDB"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Experience & Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recommended Experience
            </label>
            <select
              name="recommendedExperience"
              value={jobData.recommendedExperience}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option>Fresher</option>
              <option>Junior</option>
              <option>Mid-level</option>
              <option>Senior</option>
              <option>Expert</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Type
            </label>
            <select
              name="jobType"
              value={jobData.jobType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
              <option>Contract</option>
              <option>Remote</option>
            </select>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-700 text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Adding..." : "Add Job"}
        </button>
      </form>
    </div>
  );
};

export default AddJob;
