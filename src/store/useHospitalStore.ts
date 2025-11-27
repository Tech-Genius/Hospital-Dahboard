import { create } from 'zustand';
import type { Hospital, HospitalSearchParams } from '../types/hospital';
import { fetchHospitals } from '../api/hospitalApi';

interface HospitalState {
  allHospitals: Hospital[];
  filteredHospitals: Hospital[];
  selectedHospital: Hospital | null;

  isLoading: boolean;
  error: string | null;

  currentPage: number;
  perPage: number;
  totalCount: number;
  totalPages: number;

  searchParams: Omit<Partial<HospitalSearchParams>, 'countryId' | 'perPage' | 'page'>;

  fetchInitialHospitalData: () => Promise<void>;
  filterAndPaginateHospitals: (params: Omit<Partial<HospitalSearchParams>, 'countryId' | 'perPage' | 'page'>) => void;
  setSearchParams: (params: Omit<Partial<HospitalSearchParams>, 'countryId' | 'perPage' | 'page'>) => void;
  setSelectedHospital: (hospital: Hospital | null) => void;
  
  setCurrentPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
}

const applyFilterAndPagination = (
    allHospitals: Hospital[], 
    searchParams: Omit<Partial<HospitalSearchParams>, 'countryId' | 'perPage' | 'page'>,
    currentPage: number,
    perPage: number
) => {
    const { search } = searchParams;
    let currentlyFiltered = allHospitals;

    if (search && search.trim() !== '') {
        const searchTermLower = search.toLowerCase();
        currentlyFiltered = allHospitals.filter(hospital =>
            hospital.hospitalName?.toLowerCase().includes(searchTermLower) ||
            hospital.address?.toLowerCase().includes(searchTermLower) ||
            hospital.state?.toLowerCase().includes(searchTermLower)
        );
    }
    
    const totalCount = currentlyFiltered.length;
    const totalPages = Math.ceil(totalCount / perPage);

    let page = Math.min(currentPage, totalPages || 1);
    
    const startIndex = (page - 1) * perPage;
    const paginatedHospitals = currentlyFiltered.slice(startIndex, startIndex + perPage);

    return {
        paginatedHospitals,
        totalCount,
        totalPages,
        page
    };
};

export const useHospitalStore = create<HospitalState>((set, get) => ({
  allHospitals: [],
  filteredHospitals: [],
  selectedHospital: null,
  isLoading: false,
  error: null,

  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
  
  searchParams: {},

  fetchInitialHospitalData: async () => {
    set({ isLoading: true, error: null });

    const allHospitalsParams = {
        countryId: 166,
    };

    try {
      const response = await fetchHospitals(allHospitalsParams);
      const data = response.data.data;
      
      const { paginatedHospitals, totalCount, totalPages } = applyFilterAndPagination(
        data, 
        get().searchParams, 
        get().currentPage, 
        get().perPage
      );

      set({
        allHospitals: data,
        filteredHospitals: paginatedHospitals,
        totalCount,
        totalPages,
        isLoading: false,
        error: null,
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch hospital data.';
      set({
        error: errorMessage,
        isLoading: false,
        allHospitals: [],
        filteredHospitals: [],
        totalCount: 0,
        totalPages: 0,
      });
    }
  },

  filterAndPaginateHospitals: (newParams) => {
    const state = get();
    
    const updatedSearchParams = { ...state.searchParams, ...newParams };
    
    const { paginatedHospitals, totalCount, totalPages, page } = applyFilterAndPagination(
      state.allHospitals, 
      updatedSearchParams, 
      state.currentPage, 
      state.perPage
    );

    set({ 
      filteredHospitals: paginatedHospitals, 
      totalCount, 
      totalPages, 
      currentPage: page 
    });
  },

  setSearchParams: (newParams) => {
    set({ searchParams: newParams, currentPage: 1 });
    get().filterAndPaginateHospitals({});
  },

  setCurrentPage: (page: number) => {
    set({ currentPage: page });
    get().filterAndPaginateHospitals({});
  },

  setPerPage: (newPerPage: number) => {
    set({ perPage: newPerPage, currentPage: 1 });
    get().filterAndPaginateHospitals({});
  },

  setSelectedHospital: (hospital: Hospital | null) => {
    set({ selectedHospital: hospital });
  }
}));