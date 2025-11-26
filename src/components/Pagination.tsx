import React from 'react';
import { useHospitalStore } from '../store/useHospitalStore';

const Pagination: React.FC = () => {
  const { currentPage, totalPages, setCurrentPage, isLoading, perPage } = useHospitalStore();

  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage && !isLoading) {
      setCurrentPage(page);
    }
  };

  const PageButton: React.FC<{ page: number }> = ({ page }) => {
    const isCurrent = page === currentPage;
    const buttonClass = `w-10 h-8 flex items-center justify-center rounded transition duration-200 text-sm ${isCurrent
        ? 'bg-primary-accent text-white border border-2 cursor-default'
        : 'hover:bg-surface-medium text-text-muted cursor-pointer'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`;

    return (
      <button
        className={buttonClass}
        onClick={() => handlePageChange(page)}
        disabled={isLoading || isCurrent}
      >
        {page}
      </button>
    );
  };


  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5; // Display max 5 pages centered around the current page
    const start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      if (end < totalPages) pages.push(totalPages);
    }
    return pages.filter(p => typeof p === 'number' || p === '...');
  };


  return (
    <div className="flex space-y-2 justify-between flex-wrap max-w-fit items-center bg-surface-dark p-3 rounded-lg mt-4 shadow-xl">


      <div className="flex  items-center space-x-2 text-sm text-text-muted">
        <span>{perPage}/page</span>
      </div>

      <div className="flex flex-wrap space-y-2 justify-center items-center space-x-1">
        {/* Prev Button */}
        <button
          className={`w-8 h-8 flex font-bold mr-4 text-2xl items-center justify-center rounded hover:bg-surface-medium text-text-muted transition duration-200 ${currentPage === 1 || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
        >
          &lt;
        </button>

        {/* Page Numbers */}
        {getVisiblePages().map((page, index) => (
          typeof page === 'number' ? (
            <PageButton key={page} page={page} />
          ) : (
            <span key={index} className="w-8 h-8 flex items-center justify-center text-text-muted">...</span>
          )
        ))}

        {/* Next Button */}
        <button
          className={`w-8 h-8 flex font-bold ml-4 text-2xl items-center justify-center rounded hover:bg-surface-medium text-text-muted transition duration-200 ${currentPage === totalPages || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
        >
          &gt;
        </button>
      </div>

      <div className="text-sm text-text-muted">
      </div>
    </div>
  );
};

export default Pagination;