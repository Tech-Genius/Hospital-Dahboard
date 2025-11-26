import React, { useState } from 'react';
import { useHospitalStore } from '../store/useHospitalStore';

const SearchFilter: React.FC = () => {
  const { setSearchParams } = useHospitalStore();
  const [searchTerm, setSearchTerm] = useState('');
  // In a real application, you'd fetch available types and states for a dropdown
  const [filterType, setFilterType] = useState('');
  const [filterState, setFilterState] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ search: searchTerm.trim() || undefined });
  };

  const handleFilterChange = () => {
    setSearchParams({
        type: filterType || undefined,
        state: filterState || undefined,
    });
  }

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterType('');
    setFilterState('');
    setSearchParams({}); // Reset all filters
  }

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-xl mb-4">
      <form onSubmit={handleSearch} className="flex gap-4 items-center">
        {/* Search Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, address, or phone..."
          className="flex-grow p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-semibold transition duration-200 text-sm"
        >
          Search
        </button>
      </form>
      
      {/* Filters (by type and state) */}
      <div className="mt-4 flex gap-4">
        <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)} 
            onBlur={handleFilterChange}
            className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        >
          <option value="">Filter by Type</option>
          {/* Static options - ideally these would be fetched */}
          <option value="Hospital">Hospital</option>
          <option value="Clinic">Clinic</option>
          <option value="Health Centre">Health Centre</option>
        </select>
        
        <select 
            value={filterState} 
            onChange={(e) => setFilterState(e.target.value)} 
            onBlur={handleFilterChange}
            className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        >
          <option value="">Filter by State</option>
          {/* Static options - ideally these would be fetched */}
          <option value="Lagos">Lagos</option>
          <option value="Abuja">Abuja</option>
          <option value="Kano">Kano</option>
        </select>
        
        <button
          onClick={handleClearFilters}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded font-semibold transition duration-200 text-sm"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;