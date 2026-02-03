import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import JobCard from "./JobCard";
import JobDetailsPage from "./JobDetails";
import SearchSection from "./SearchSection";
import FilterSidebar from "./FilterSidebar";

const JobBoardHome = () => {
  const [jobs, setJobs] = useState([]); // server-provided jobs for current page
  const [totalJobs, setTotalJobs] = useState(0); // total jobs from server
  const [selectedJob, setSelectedJob] = useState(null);

  // Filters coming from FilterSidebar
  const [filters, setFilters] = useState({
    categories: [],
    locations: [],
    experience: [],
    jobTypes: [],
  });

  // SearchSection manages searchTerm and location (optional)
  const [searchParams, setSearchParams] = useState({
    searchTerm: "",
    location: "",
  });

  const [currentPage, setCurrentPage] = useState(0);
  const jobsPerPage = 5; // number of jobs per page

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Build query string for backend based on filters/search and pagination
  const buildQuery = ({ filters, searchParams, page }) => {
    const params = new URLSearchParams();

    // Pagination: limit and skip
    params.append("limit", jobsPerPage);
    params.append("skip", page * jobsPerPage);

    // Single-track support: if categories (tracks) has 1 value, use track param
    // If multiple tracks are selected, you could either send multiple requests or
    // extend backend to accept arrays. For now send the first one or omit.
    if (filters.categories && filters.categories.length === 1) {
      params.append("track", filters.categories[0]);
    }

    // Location - if one selected prefer filter.location, else use searchParams.location
    if (filters.locations && filters.locations.length === 1) {
      params.append("location", filters.locations[0]);
    } else if (searchParams.location) {
      params.append("location", searchParams.location);
    }

    // jobType (type) - if jobTypes single selection
    if (filters.jobTypes && filters.jobTypes.length === 1) {
      params.append("type", filters.jobTypes[0]);
    }

    // Search term maps to text search on backend
    if (searchParams.searchTerm) {
      params.append("search", searchParams.searchTerm);
    }

    return params.toString();
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchJobs = async () => {
      setLoading(true);
      setError(null);

      try {
        const queryString = buildQuery({
          filters,
          searchParams,
          page: currentPage,
        });

        const url = `https://iiuc-hackathon-backend.vercel.app/jobs${queryString ? `?${queryString}` : ""}`;

        const res = await fetch(url, { signal });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`HTTP ${res.status} - ${text || res.statusText}`);
        }

        const data = await res.json();

        // Expecting shape: { success: true, jobs, pagination: { total, limit, skip, hasMore } }
        setJobs(data.jobs || []);
        setTotalJobs(
          (data.pagination && data.pagination.total) || (data.total ?? 0),
        );
      } catch (err) {
        if (err.name === "AbortError") {
          // request was aborted - do nothing
          return;
        }
        console.error("Failed to fetch jobs:", err);
        setError(err.message || "Failed to fetch jobs");
        setJobs([]);
        setTotalJobs(0);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();

    // cleanup on unmount or when dependencies change
    return () => controller.abort();
    // Re-fetch when filters, searchParams or page changes
  }, [filters, searchParams, currentPage, jobsPerPage]);

  // If filters/search change, reset to page 0
  useEffect(() => {
    setCurrentPage(0);
  }, [filters, searchParams]);

  // Page count from server total
  const pageCount = Math.ceil(totalJobs / jobsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
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
              <h2 className="text-2xl font-bold text-black mb-2">
                Latest Jobs
              </h2>
              <p className="text-gray-700">
                Get your desired job from top companies ({totalJobs} jobs found)
              </p>
            </div>

            {loading ? (
              <div className="bg-white p-8 rounded-lg text-center">
                Loading jobs...
              </div>
            ) : error ? (
              <div className="bg-white p-8 rounded-lg text-center text-red-600">
                Error: {error}
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.length === 0 && (
                  <div className="bg-white p-12 rounded-lg text-center">
                    <p className="text-gray-500 text-lg">
                      No jobs found matching your criteria
                    </p>
                  </div>
                )}

                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {pageCount > 1 && !loading && (
              <div className="flex justify-center mt-8">
                <ReactPaginate
                  previousLabel={"← Previous"}
                  nextLabel={"Next →"}
                  pageCount={pageCount}
                  onPageChange={handlePageClick}
                  forcePage={currentPage}
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
