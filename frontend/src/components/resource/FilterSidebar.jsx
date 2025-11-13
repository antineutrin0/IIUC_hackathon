import { useState } from "react";
import { Filter, ChevronUp, ChevronDown } from "lucide-react";
const FilterSidebar = ({ filters, onFilterChange }) => {
  const [expandedSections, setExpandedSections] = useState({
    language: true,
    topic: true,
    platform: true,
    level: true,
    cost: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const languages = [
    { name: 'English', count: 8 },
    { name: 'Spanish', count: 3 },
    { name: 'Arabic', count: 1 }
  ];

  const topics = [
    { name: 'Web Development', count: 3 },
    { name: 'Data Science', count: 2 },
    { name: 'Personal Development', count: 2 },
    { name: 'Marketing', count: 1 }
  ];

  const platforms = [
    { name: 'Udemy', count: 4 },
    { name: 'Coursera', count: 3 },
    { name: 'YouTube', count: 1 }
  ];

  const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
  const costs = ['Free', 'Paid', 'Mixed'];

  const FilterSection = ({ title, items, filterKey, isExpanded }) => (
    <div className="mb-6">
      <button
        onClick={() => toggleSection(filterKey)}
        className="flex items-center justify-between w-full mb-3"
      >
        <h4 className="font-semibold text-black">{title}</h4>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isExpanded && (
        <div className="space-y-2">
          {items.map((item) => {
            const itemName = typeof item === 'string' ? item : item.name;
            const itemCount = typeof item === 'string' ? null : item.count;
            return (
              <label key={itemName} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters[filterKey].includes(itemName)}
                  onChange={(e) => {
                    const newFilter = e.target.checked
                      ? [...filters[filterKey], itemName]
                      : filters[filterKey].filter(f => f !== itemName);
                    onFilterChange({ ...filters, [filterKey]: newFilter });
                  }}
                  className="mr-2 accent-green-600"
                />
                <span className="text-black text-sm">
                  {itemName} {itemCount && `(${itemCount})`}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <button className="flex items-center gap-2 text-black font-semibold">
          <Filter size={20} />
          Filter
        </button>
        <button
          onClick={() => onFilterChange({
            languages: [],
            topics: [],
            platforms: [],
            levels: [],
            costs: []
          })}
          className="text-green-600 text-sm hover:underline"
        >
          Clear filters
        </button>
      </div>

      <FilterSection
        title="Language"
        items={languages}
        filterKey="languages"
        isExpanded={expandedSections.language}
      />
      
      <FilterSection
        title="Topic"
        items={topics}
        filterKey="topics"
        isExpanded={expandedSections.topic}
      />

      <FilterSection
        title="Platform"
        items={platforms}
        filterKey="platforms"
        isExpanded={expandedSections.platform}
      />

      <FilterSection
        title="Level"
        items={levels}
        filterKey="levels"
        isExpanded={expandedSections.level}
      />

      <FilterSection
        title="Cost"
        items={costs}
        filterKey="costs"
        isExpanded={expandedSections.cost}
      />
    </div>
  );
};
export default FilterSidebar;