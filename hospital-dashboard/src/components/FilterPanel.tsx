import React, { useState, useEffect } from 'react';
import RightDrawer from './UI/RightDrawer';
import { useHospitalStore } from '../store/useHospitalStore';
import type { HospitalSearchParams } from '../types/hospital';

interface FilterPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

const mockFilterOptions = {
    type: ['Hospital', 'Clinic', 'Health Centre', 'Posto de Saúde', 'Specialty Center'],
    state: ['Lagos', 'Abuja', 'Kano', 'Rivers', 'Oyo'],
    country: ['Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Uganda', 'Tanzania'], 
};

const FilterPanel: React.FC<FilterPanelProps> = ({ isOpen, onClose }) => {
  const { setSearchParams, searchParams } = useHospitalStore();
  
  const [localFilters, setLocalFilters] = useState({
      type: searchParams.type || '',
      state: searchParams.state || '',
      country: 'Nigeria', 
      search: '' 
  });


  useEffect(() => {
      setLocalFilters(prev => ({ 
          ...prev,
          type: searchParams.type || '',
          state: searchParams.state || '',
      }));
  }, [searchParams.type, searchParams.state]);

  const handleFilterChange = (key: keyof typeof localFilters, value: string) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const handleApplyFilters = () => {
      const newSearchParams: Omit<Partial<HospitalSearchParams>, 'countryId' | 'perPage'> = {
          type: localFilters.type || undefined,
          state: localFilters.state || undefined,
      };
      setSearchParams(newSearchParams);
      onClose();
  };
  
  const handleClearFilters = () => {
      setLocalFilters({ type: '', state: '', country: 'Nigeria', search: '' });
      setSearchParams({});
      onClose();
  };


  return (
    <RightDrawer isOpen={isOpen} onClose={onClose} widthClass="w-full md:w-80">
      <div className="flex justify-between items-center border-b border-surface-medium pb-4 mb-6">
        <h2 className="text-xl font-bold text-white">List of counties</h2>
        <button 
            onClick={onClose} 
            className="text-text-muted hover:text-white p-2 rounded-full hover:bg-surface-medium"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      
      <div className="space-y-6">
          <div className="relative">
             <input
                type="text"
                placeholder="Search filter to apply"
                value={localFilters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-surface-medium border border-surface-medium focus:outline-none focus:border-primary-accent text-sm placeholder-text-muted"
              />
              <svg className="w-5 h-5 text-text-muted absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          
          <div className="space-y-3">
              <h3 className="text-lg font-semibold text-text-light">Country</h3>
              {mockFilterOptions.country.map(country => (
                  <div key={country} className="flex items-center text-sm">
                      <input 
                          type="radio" 
                          name="country" 
                          id={`country-${country}`} 
                          value={country} 
                          checked={localFilters.country === country}
                          onChange={(e) => handleFilterChange('country', e.target.value)}
                          className="w-4 h-4 text-primary-accent bg-surface-medium border-surface-medium focus:ring-primary-accent"
                          disabled={country !== 'Nigeria'} 
                      />
                      <label 
                          htmlFor={`country-${country}`} 
                          className={`ml-3 ${country === 'Nigeria' ? 'text-white font-medium' : 'text-text-muted opacity-50'}`}
                      >
                          {country}
                      </label>
                  </div>
              ))}
          </div>

          <div className="space-y-3">
              <h3 className="text-lg font-semibold text-text-light">Hospital Type</h3>
              <select 
                  value={localFilters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full p-2 rounded-lg bg-surface-medium border border-surface-medium focus:outline-none focus:border-primary-accent text-sm text-text-light"
              >
                  <option value="">All Types</option>
                  {mockFilterOptions.type.map(type => (
                      <option key={type} value={type}>{type}</option>
                  ))}
              </select>
          </div>

          <div className="space-y-3">
              <h3 className="text-lg font-semibold text-text-light">State</h3>
              <select 
                  value={localFilters.state}
                  onChange={(e) => handleFilterChange('state', e.target.value)}
                  className="w-full p-2 rounded-lg bg-surface-medium border border-surface-medium focus:outline-none focus:border-primary-accent text-sm text-text-light"
              >
                  <option value="">All States</option>
                  {mockFilterOptions.state.map(state => (
                      <option key={state} value={state}>{state}</option>
                  ))}
              </select>
          </div>

      </div>
      
      <div className="mt-8 pt-4 border-t border-surface-medium flex justify-between">
          <button 
              onClick={handleClearFilters}
              className="px-4 py-2 text-text-muted hover:text-white hover:bg-surface-medium rounded-lg transition duration-200"
          >
              Clear Filters
          </button>
          <button 
              onClick={handleApplyFilters}
              className="px-4 py-2 bg-primary-accent hover:bg-primary-accent/80 text-white rounded-lg font-semibold transition duration-200"
          >
              Apply Filter
          </button>
      </div>

    </RightDrawer>
  );
};

export default FilterPanel;