import React from 'react';
import { useHospitalStore } from '../store/useHospitalStore';

const Pagination: React.FC = () => {
    const { 
        currentPage, 
        totalPages, 
        setCurrentPage, 
        isLoading, 
        perPage, 
        setPerPage, 
        totalCount 
    } = useHospitalStore();

    if (totalPages <= 1) return null;

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage && !isLoading) {
            setCurrentPage(page);
        }
    };

    const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newPerPage = parseInt(e.target.value);
        if (!isNaN(newPerPage) && newPerPage > 0) {
            setPerPage(newPerPage);
        }
    };

    const perPageOptions = [20, 30, 40, 50];

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
        const maxVisible = 5;
        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages, start + maxVisible - 1);
        
        if (end - start + 1 < maxVisible) {
             start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (start > 1) {
            if (start > 2) pages.unshift('...');
            pages.unshift(1);
        }

        if (end < totalPages) {
             if (end < totalPages - 1) pages.push('...');
             if (pages[pages.length - 1] !== totalPages) pages.push(totalPages); 
        }

        return pages.filter((p, i, arr) => 
             !(p === '...' && arr[i-1] === '...') && !(p === totalPages && arr[i-1] === totalPages)
        );
    };


    return (
        <div className='flex justify-end'>
            <div className="flex space-y-2 justify-between gap-8 flex-wrap max-w-fit items-center bg-surface-dark p-3 rounded-lg mt-4 shadow-xl">

                <div className="flex flex-wrap space-y-2 md:space-y-0 justify-center items-center space-x-1">
                    <button
                        className={`w-8 h-8 flex font-bold mr-4 text-2xl items-center justify-center rounded hover:bg-surface-medium text-text-muted transition duration-200 ${currentPage === 1 || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1 || isLoading}
                    >
                        &lt;
                    </button>

                    {getVisiblePages().map((page, index) => (
                        typeof page === 'number' ? (
                            <PageButton key={page} page={page} />
                        ) : (
                            <span key={`dots-${index}`} className="w-8 h-8 flex items-center justify-center text-text-muted">...</span>
                        )
                    ))}

                    <button
                        className={`w-8 h-8 flex font-bold ml-4 text-2xl items-center justify-center rounded hover:bg-surface-medium text-text-muted transition duration-200 ${currentPage === totalPages || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || isLoading}
                    >
                        &gt;
                    </button>
                </div>

                <div className="text-sm text-text-muted">
                    {totalCount > 0 && 
                        `Showing ${((currentPage - 1) * perPage) + 1} - ${Math.min(currentPage * perPage, totalCount)} of ${totalCount} results`
                    }
                </div>

                <div className="flex items-center space-x-2 text-sm text-text-muted">
                    <select
                        value={perPage}
                        onChange={handlePerPageChange}
                        className="w-full py-3 px-4 rounded-lg bg-[#1F1F1F] focus:outline-none focus:border-primary-accent text-sm placeholder-text-[#656565]"
                    >
                        <option value={10}>10/page</option>
                        {perPageOptions.map(number => (
                            <option key={number} value={number}>{`${number}/page`}</option>
                        ))}
                    </select>
                </div>

            </div>
        </div>
    );
};

export default Pagination;