import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import FilterSidebar from "./FilterSidebar";
import ResourceCard from "./ResourceCard";
import CourseDetailsPage from "./ResourceDetails";
import { demoResources } from "./demoResource";

const ResourcePage = () => {
  const [resources, setResources] = useState(demoResources);
  const [filteredResources, setFilteredResources] = useState(demoResources);
  const [selectedResource, setSelectedResource] = useState(null);
  const [sortBy, setSortBy] = useState('Most Popular');
  const [filters, setFilters] = useState({
    languages: [],
    topics: [],
    platforms: [],
    levels: [],
    costs: []
  });

  // Filter and sort resources
  useEffect(() => {
    let result = [...resources];

    // Apply filters
    if (filters.languages.length > 0) {
      result = result.filter(r => 
        r.languages.some(lang => filters.languages.includes(lang))
      );
    }

    if (filters.platforms.length > 0) {
      result = result.filter(r => filters.platforms.includes(r.platform));
    }

    if (filters.levels.length > 0) {
      result = result.filter(r => filters.levels.includes(r.level));
    }

    if (filters.costs.length > 0) {
      result = result.filter(r => filters.costs.includes(r.cost));
    }

    // Apply sorting
    if (sortBy === 'Most Popular') {
      result.sort((a, b) => b.students - a.students);
    } else if (sortBy === 'Highest Rated') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'Newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredResources(result);
  }, [filters, sortBy, resources]);

  // Simulate fetching from database
  useEffect(() => {
    // In real implementation: fetch('/api/resources')
    setResources(demoResources);
  }, []);

  if (selectedResource) {
    return <CourseDetailsPage resource={selectedResource} onBack={() => setSelectedResource(null)} />;
  }

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black mb-4">Browse free courses</h1>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-black cursor-pointer"
              >
                <option>Most Popular</option>
                <option>Highest Rated</option>
                <option>Newest</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" size={20} />
            </div>
            
            <span className="text-gray-700">{filteredResources.length} results</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <FilterSidebar filters={filters} onFilterChange={setFilters} />
          </div>

          {/* Resources List */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {filteredResources.map(resource => (
                <ResourceCard
                  key={resource._id}
                  resource={resource}
                  onClick={setSelectedResource}
                />
              ))}

              {filteredResources.length === 0 && (
                <div className="bg-white p-12 rounded-lg text-center">
                  <p className="text-gray-500 text-lg">No resources found matching your criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcePage;