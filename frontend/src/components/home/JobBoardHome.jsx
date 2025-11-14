import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import JobCard from "./JobCard";
import JobDetailsPage from "./JobDetails";
import SearchSection from "./SearchSection";
import FilterSidebar from "./FilterSidebar";
import { demoJobs } from "./demoJobs.js"; // adjust path as needed

const JobBoardHome = () => {
  const [jobs, setJobs] = useState(demoJobs);
  const [filteredJobs, setFilteredJobs] = useState(demoJobs);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filters, setFilters] = useState({
    categories: [],
    locations: [],
    experience: [],
    jobTypes: [],
  });
  const [searchParams, setSearchParams] = useState({
    searchTerm: "",
    location: "",
  });

  const [currentPage, setCurrentPage] = useState(0);
  const jobsPerPage = 5; // number of jobs to show per page

  // Filter jobs based on filters and search
  useEffect(() => {
    let result = [...jobs];

    // Apply search filter
    if (searchParams.searchTerm) {
      const term = searchParams.searchTerm.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(term) ||
          job.company.toLowerCase().includes(term) ||
          job.description.toLowerCase().includes(term)
      );
    }

    // Apply location search
    if (searchParams.location) {
      const loc = searchParams.location.toLowerCase();
      result = result.filter((job) =>
        job.location.toLowerCase().includes(loc)
      );
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter((job) => filters.categories.includes(job.track));
    }

    // Apply location filter
    if (filters.locations.length > 0) {
      result = result.filter((job) => filters.locations.includes(job.location));
    }

    // Apply experience filter
    if (filters.experience.length > 0) {
      result = result.filter((job) =>
        filters.experience.includes(job.recommendedExperience)
      );
    }

    // Apply job type filter
    if (filters.jobTypes.length > 0) {
      result = result.filter((job) => filters.jobTypes.includes(job.jobType));
    }

    setFilteredJobs(result);
    setCurrentPage(0); // reset to first page whenever filters change
  }, [filters, searchParams, jobs]);

  // Simulate fetching from database
  useEffect(() => {
    // In real implementation, you would fetch from your API
    // fetch('/api/jobs')
    //   .then(res => res.json())
    //   .then(data => setJobs(data));

    setJobs(demoJobs);
  }, []);

  // Pagination logic
  const offset = currentPage * jobsPerPage;
  const currentJobs = filteredJobs.slice(offset, offset + jobsPerPage);
  const pageCount = Math.ceil(filteredJobs.length / jobsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (selectedJob) {
    return (
      <JobDetailsPage job={selectedJob} onBack={() => setSelectedJob(null)} />
    );
  }

  return (
    <div className="min-h-screen bg-green-50">
      <SearchSection onSearch={setSearchParams} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <FilterSidebar filters={filters} onFilterChange={setFilters} />
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-black mb-2">Latest Jobs</h2>
              <p className="text-gray-700">
                Get your desired job from top companies ({filteredJobs.length} jobs found)
              </p>
            </div>

            <div className="space-y-4">
              {currentJobs.map((job) => (
                <JobCard key={job._id} job={job} onClick={setSelectedJob} />
              ))}

              {filteredJobs.length === 0 && (
                <div className="bg-white p-12 rounded-lg text-center">
                  <p className="text-gray-500 text-lg">
                    No jobs found matching your criteria
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredJobs.length > 0 && (
              <div className="flex justify-center mt-8">
                <ReactPaginate
                  previousLabel={"← Previous"}
                  nextLabel={"Next →"}
                  pageCount={pageCount}
                  onPageChange={handlePageClick}
                  containerClassName={
                    "flex space-x-2 text-gray-700 select-none"
                  }
                  pageClassName={
                    "px-4 py-2 border border-gray-300 rounded-md hover:bg-white"
                  }
                  previousClassName={
                    "px-4 py-2 border border-gray-300 rounded-md hover:bg-white"
                  }
                  nextClassName={
                    "px-4 py-2 border border-gray-300 rounded-md hover:bg-white"
                  }
                  activeClassName={"bg-green-600 text-white"}
                  disabledClassName={"opacity-50 cursor-not-allowed"}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobBoardHome;
