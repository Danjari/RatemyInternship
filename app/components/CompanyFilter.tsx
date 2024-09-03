import { useState } from 'react';

interface FilterCompaniesProps {
  onFilter: (location: string, industry: string) => void;
}

export default function FilterCompanies({ onFilter }: FilterCompaniesProps) {
  const [location, setLocation] = useState('');
  const [industry, setIndustry] = useState('');

  const handleFilter = () => {
    onFilter(location, industry);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white max-w-sm">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">Filter Companies</h2>
      
      {/* Location Filter */}
      <div className="mb-4">
        <label className="block mb-2 text-gray-400" htmlFor="location">
          Location
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Enter location"
        />
      </div>

      {/* Industry Filter */}
      <div className="mb-4">
        <label className="block mb-2 text-gray-400" htmlFor="industry">
          Industry
        </label>
        <input
          type="text"
          id="industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Enter industry"
        />
      </div>

      {/* Filter Button */}
      <button
        onClick={handleFilter}
        className="w-full bg-blue-600 py-2 mt-4 rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Apply Filters
      </button>
    </div>
  );
}
