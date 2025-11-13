import { MapPin, Search } from 'lucide-react';
import React, { useState } from 'react';

const SearchSection = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    onSearch({ searchTerm, location });
  };

  return (
    <div className="bg-green-50 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-black mb-3">
          Over 10,000+ jobs to apply
        </h1>
        <p className="text-gray-700 mb-8">
          Your Next Big Career Move Starts Right Here - Explore The Best Job Opportunities<br />
          And Take The First Step Toward Your Future!
        </p>
        
        <div className="bg-white rounded-lg shadow-md p-2 flex flex-col md:flex-row gap-2 max-w-3xl mx-auto">
          <div className="flex items-center flex-1 px-3 border-r border-gray-200">
            <Search className="text-gray-400 mr-2" size={20} />
            <input
              type="text"
              placeholder="Search for jobs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 outline-none text-black"
            />
          </div>
          
          <div className="flex items-center flex-1 px-3">
            <MapPin className="text-gray-400 mr-2" size={20} />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full py-2 outline-none text-black"
            />
          </div>
          
          <button
            onClick={handleSearch}
            className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition-colors font-medium"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;