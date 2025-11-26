import React, { useState } from 'react';
import { useHospitalStore } from '../store/useHospitalStore';
import { FaFilter } from "react-icons/fa";
interface HospitalHeaderProps {
    onFilterToggle: () => void;
}

const HospitalHeader: React.FC<HospitalHeaderProps> = ({ onFilterToggle }) => {
    const { setSearchParams, searchParams } = useHospitalStore();
    const [searchTerm, setSearchTerm] = useState(searchParams.search || '');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
        setSearchParams({ search: term || undefined });
    };

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(`Country changed to: ${e.target.value}. Not implemented as countryId must be 166.`);
    };


    return (
        <div className="space-y-6 mx-8">
            <h2 className="text-4xl font-[600] mb-8 text-[#ffffff]">Hospital</h2>

            <div className="flex items-center gap-4">
                {/* Search Input Area */}
                <div className="flex-grow relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search by hospital name"
                        className="w-max-w md:w-[400px] pl-10 pr-4 py-3 rounded-lg bg-[#1F1F1F]   focus:outline-none focus:border-primary-accent text-sm placeholder-text-[#656565]"
                    />
                    {/* Search Icon */}
                    <svg className="w-5 h-5 text-[#656565] absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>


                <div className="flex gap-4">

                    <select
                        value="Nigeria"
                        onChange={handleCountryChange}
                        className="px-6 rounded-lg bg-surface-medium border border-[#656565B2] focus:outline-none focus:border-[#656565B2] text-sm text-text-light"
                    >
                        <option value="Nigeria">Nigeria</option>

                    </select>


                    <button
                        onClick={onFilterToggle}
                        className="p-2 cursor-pointer rounded-lg bg-surface-medium hover:bg-surface-medium/70 transition duration-150"
                        title="Open Filters"
                    >
                        <FaFilter />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HospitalHeader;