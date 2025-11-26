import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import HospitalHeader from './components/HospitalHeader';
import HospitalList from './components/HospitalList';
import Pagination from './components/Pagination';
import HospitalDetail from './components/HospitalDetail';
import FilterPanel from './components/FilterPanel';
import { useHospitalStore } from './store/useHospitalStore';
import ErrorMessage from './components/UI/ErrorMessage';

const App: React.FC = () => {
  const { selectedHospital, error } = useHospitalStore();
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-dark">
      {/* 1. Left Sidebar*/}
      <Sidebar /> 
      
      {/* 2. Main Content Area */}
      <main className="ml-0 md:ml-[260px] bg-[#111111] py-12">
        
        {/* Header  */}
        <HospitalHeader onFilterToggle={() => setIsFilterPanelOpen(true)} />
        
        <div className="mt-8">
            {/* i'm displaying a global error message if API fails */}
            {error && <ErrorMessage message={error} />}

            {/* Hospital List and Pagination */}
            <HospitalList />
            <Pagination />
        </div>
      </main>

      <HospitalDetail />
      
      <FilterPanel 
        isOpen={isFilterPanelOpen} 
        onClose={() => setIsFilterPanelOpen(false)} 
      />
      

    </div>
  );
};

export default App;