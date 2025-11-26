import { create } from 'zustand';
import type { Hospital, HospitalData, HospitalSearchParams } from '../types/hospital';
import { fetchHospitals } from '../api/hospitalApi';


interface HospitalState {
  // Data
  hospitals: Hospital[];
  selectedHospital: Hospital | null;

  // State management
  isLoading: boolean;
  error: string | null;

  // Pagination & Filtering
  currentPage: number;
  perPage: number; 
  totalCount: number;
  totalPages: number;
  searchParams: Omit<Partial<HospitalSearchParams>, 'countryId' | 'perPage'>;
  
  fetchHospitalsList: (page?: number, params?: Partial<HospitalSearchParams>) => Promise<void>;
  setCurrentPage: (page: number) => void;
  setSearchParams: (params: Omit<Partial<HospitalSearchParams>, 'countryId' | 'perPage'>) => void;
  setSelectedHospital: (hospital: Hospital | null) => void;
}

export const useHospitalStore = create<HospitalState>((set, get) => ({
  hospitals: [],
  selectedHospital: null,
  isLoading: false,
  error: null,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
  searchParams: {},
  
  fetchHospitalsList: async (page = 1, params = {}) => {
    set({ isLoading: true, error: null, currentPage: page });
    
    const currentParams = get().searchParams;
    const combinedParams: Partial<HospitalSearchParams> = {
        ...currentParams,
        ...params,
        page: page,
        countryId: 166,
        perPage: get().perPage, 
    };
    
    set({ 
        searchParams: { 
            search: combinedParams.search, 
            type: combinedParams.type, 
            state: combinedParams.state 
        } 
    });

    try {
      const response = await fetchHospitals(combinedParams);

      set({
        hospitals: response.data.data,
        totalCount: response.data.totalCount,
        totalPages: response.data.totalPages,
        isLoading: false,
        error: null,
      });
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch hospital data.';
      set({ 
        error: errorMessage, 
        isLoading: false, 
        hospitals: [], 
        totalCount: 0, 
        totalPages: 0 
      });
    }
  },


  setCurrentPage: (page: number) => {
    set({ currentPage: page });
    get().fetchHospitalsList(page);
  },

  setSearchParams: (newParams) => {
    get().fetchHospitalsList(1, newParams);
  },
  
  setSelectedHospital: (hospital: Hospital | null) => {
    set({ selectedHospital: hospital });
  }
}));