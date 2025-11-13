import { Filter } from "lucide-react";


const FilterSidebar = ({ filters, onFilterChange }) => {
  const categories = [
    { name: 'Web Development', count: 3 },
    { name: 'Backend Development', count: 1 },
    { name: 'Data Science', count: 1 },
    { name: 'Design', count: 1 },
    { name: 'Mobile Development', count: 1 },
    { name: 'DevOps', count: 1 },
    { name: 'Product Management', count: 1 }
  ];

  const locations = [
    { name: 'Remote', count: 2 },
    { name: 'Bangalore', count: 1 },
    { name: 'Hyderabad', count: 1 },
    { name: 'Mumbai', count: 1 },
    { name: 'Chennai', count: 1 },
    { name: 'Pune', count: 1 },
    { name: 'Delhi', count: 1 },
    { name: 'California', count: 1 }
  ];

  const experienceLevels = ['Fresher', 'Junior', 'Mid', 'Senior'];
  const jobTypes = ['Internship', 'Part-time', 'Full-time', 'Freelance'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-black text-lg">Filters</h3>
        <Filter size={20} className="text-green-600" />
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-semibold text-green-600 mb-3">Search by Categories</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat.name} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat.name)}
                onChange={(e) => {
                  const newCategories = e.target.checked
                    ? [...filters.categories, cat.name]
                    : filters.categories.filter(c => c !== cat.name);
                  onFilterChange({ ...filters, categories: newCategories });
                }}
                className="mr-2 accent-green-600"
              />
              <span className="text-black text-sm">{cat.name} ({cat.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div className="mb-6">
        <h4 className="font-semibold text-green-600 mb-3">Experience Level</h4>
        <div className="space-y-2">
          {experienceLevels.map((level) => (
            <label key={level} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.experience.includes(level)}
                onChange={(e) => {
                  const newExp = e.target.checked
                    ? [...filters.experience, level]
                    : filters.experience.filter(l => l !== level);
                  onFilterChange({ ...filters, experience: newExp });
                }}
                className="mr-2 accent-green-600"
              />
              <span className="text-black text-sm">{level}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Job Type */}
      <div className="mb-6">
        <h4 className="font-semibold text-green-600 mb-3">Job Type</h4>
        <div className="space-y-2">
          {jobTypes.map((type) => (
            <label key={type} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.jobTypes.includes(type)}
                onChange={(e) => {
                  const newTypes = e.target.checked
                    ? [...filters.jobTypes, type]
                    : filters.jobTypes.filter(t => t !== type);
                  onFilterChange({ ...filters, jobTypes: newTypes });
                }}
                className="mr-2 accent-green-600"
              />
              <span className="text-black text-sm">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Locations */}
      <div>
        <h4 className="font-semibold text-green-600 mb-3">Search by Location</h4>
        <div className="space-y-2">
          {locations.map((loc) => (
            <label key={loc.name} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.locations.includes(loc.name)}
                onChange={(e) => {
                  const newLocs = e.target.checked
                    ? [...filters.locations, loc.name]
                    : filters.locations.filter(l => l !== loc.name);
                  onFilterChange({ ...filters, locations: newLocs });
                }}
                className="mr-2 accent-green-600"
              />
              <span className="text-black text-sm">{loc.name} ({loc.count})</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FilterSidebar;