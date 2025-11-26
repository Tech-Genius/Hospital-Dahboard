import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#fffff]"></div>
      <span className="ml-3 text-lg text-[#fffff}">Loading data</span>
    </div>
  );
};

export default LoadingSpinner;