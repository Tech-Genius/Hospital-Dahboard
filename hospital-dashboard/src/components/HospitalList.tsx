import React, { useEffect } from 'react';
import { useHospitalStore } from '../store/useHospitalStore';
import LoadingSpinner from './UI/LoadingSpinner';
import ErrorMessage from './UI/ErrorMessage';
import type { Hospital } from '../types/hospital';
import { BsThreeDotsVertical } from "react-icons/bs";

const HospitalRow: React.FC<{ hospital: Hospital }> = ({ hospital }) => {
    const { setSelectedHospital } = useHospitalStore();

    return (
        <tr
            key={hospital.id}
            className="border-b border-[#2A2A2A] hover:bg-[#2A2A2A]/50 transition duration-150 cursor-pointer"
            onClick={() => setSelectedHospital(hospital)}
        >
            <td className="px-6 py-4 text-sm text-[#FFFFFF]">{hospital.hospitalName || 'N/A'}</td>
            <td className="px-6 py-4 text-sm text-[#FFFFFF] hidden sm:table-cell">{hospital.hospitalEmail || 'N/A'}</td>
            <td className="px-6 py-4 text-sm text-[#FFFFFF] hidden md:table-cell">{hospital.phoneNumber || 'N/A'}</td>
            <td className="px-6 py-4 text-sm text-[#FFFFFF] hidden lg:table-cell">{hospital.address || 'N/A'}</td>
            <td className="px-6 py-4 text-sm text-[#FFFFFF] hidden lg:table-cell">{hospital.country || 'N/A'}</td>
            <td className="px-6 py-4 text-sm text-[#FFFFFF] hidden xl:table-cell">{hospital.state || 'N/A'}</td>


            <td className="px-6 py-4 text-right">
                <button className="text-text-muted cursor-pointer hover:text-white p-1 rounded-full hover:bg-surface-medium">
                    <BsThreeDotsVertical />
                </button>
            </td>
        </tr>
    );
};

const HospitalList: React.FC = () => {
    const {
        hospitals,
        isLoading,
        error,
        fetchHospitalsList,
        totalCount
    } = useHospitalStore();

    // Initial fetch on component mount
    useEffect(() => {
        // Only fetch if data is empty 
        if (hospitals.length === 0 && totalCount === 0) {
            fetchHospitalsList(1, {
                sortBy: 'id',
                sortDirection: 'desc'
            });
        }
    }, [fetchHospitalsList, hospitals.length, totalCount]);

    // Handle loading state
    if (isLoading) {
        return <LoadingSpinner />;
    }

    // Handle error state
    if (error) {
        return <ErrorMessage message={error} />;
    }

    // Handle no data state
    if (hospitals.length === 0) {
        return (
            <div className="p-8 text-center text-text-muted">
                <p className="text-xl">No hospitals found matching criteria.</p>
            </div>
        )
    }

    return (
        <div className="overflow-x-auto rounded-xl bg-surface-dark shadow-xl">
            <table className="min-w-full divide-y  divide-[#2A2A2A]">
                <thead className="bg-surface-medium border border-t-[#2A2A2A]">
                    <tr>
                        <th className="px-6 py-5 text-left text-sm font-semibold text-[#656565] tracking-wider">
                            Hospital Name
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-[#656565] tracking-wider hidden sm:table-cell">
                            Email
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-[#656565] tracking-wider hidden md:table-cell">
                            Phone Number
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-[#656565] tracking-wider hidden lg:table-cell">
                            Address
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-[#656565] tracking-wider hidden lg:table-cell">
                            Country
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-[#656565] tracking-wider hidden xl:table-cell">
                            State
                        </th>
                        <th className=" py-3  text-sm font-semibold text-[#656565] tracking-wider hidden xl:table-cell">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-surface-medium/70">
                    {hospitals.map((hospital) => (
                        <HospitalRow key={hospital.id} hospital={hospital} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HospitalList;