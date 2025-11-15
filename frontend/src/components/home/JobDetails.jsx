import axios from "axios";
import { Briefcase, ChevronRight, MapPinPen } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:8000/jobs/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          }
        );

        console.log('Fetched job:', res.data.job);
        setJob(res.data.job);
        setError(null);
      } catch (error) {
        console.error('Error fetching job:', error.response?.data || error.message);
        setError(error.response?.data?.message || 'Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-green-50">
        <div className="max-w-4xl mx-auto p-6">
          <button
            onClick={handleBack}
            className="flex items-center text-green-600 hover:text-green-700 mb-6 font-medium"
          >
            <ChevronRight className="rotate-180 mr-1" size={20} />
            Back to Jobs
          </button>
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-red-600 text-lg">{error || 'Job not found'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={handleBack}
          className="flex items-center text-green-600 hover:text-green-700 mb-6 font-medium"
        >
          <ChevronRight className="rotate-180 mr-1" size={20} />
          Back to Jobs
        </button>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-green-50 rounded-lg flex items-center justify-center">
              <Briefcase className="text-green-600" size={32} />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-black mb-2">{job.title}</h1>
              <p className="text-xl text-gray-700 mb-3">{job.company}</p>
              <div className="flex flex-wrap gap-2">
                <span className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium">
                  <MapPinPen size={16} />
                  {job.location}
                </span>
                <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium">
                  {job.jobType}
                </span>
                <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium">
                  {job.recommendedExperience}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mb-6">
            <h2 className="text-xl font-semibold text-green-600 mb-3">Job Description</h2>
            <p className="text-gray-700 leading-relaxed mb-6">{job.description}</p>

            <h2 className="text-xl font-semibold text-green-600 mb-3">Required Skills</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {job.requiredSkills && job.requiredSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-green-50 text-green-600 rounded-md font-medium capitalize"
                >
                  {skill}
                </span>
              ))}
            </div>

            <h2 className="text-xl font-semibold text-green-600 mb-3">Track</h2>
            <p className="text-gray-700 mb-6">{job.track}</p>

            {job.tags && job.tags.length > 0 && (
              <>
                <h2 className="text-xl font-semibold text-green-600 mb-3">Benefits</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {job.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 border border-green-600 text-green-600 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg">
            Apply for this Position
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;