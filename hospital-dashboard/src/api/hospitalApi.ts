import axios from 'axios';
import type { HospitalApiResponse, HospitalSearchParams } from '../types/hospital';

const API_BASE_URL = 'https://backend-dev.sofiamatics.com/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const fetchHospitals = async (params: Partial<HospitalSearchParams>): Promise<HospitalApiResponse> => {

  const defaultParams: HospitalSearchParams = {
    countryId: 166, 
    page: 1,
    perPage: 10, 
    sortBy: 'id', 
    sortDirection: 'desc',
    ...params, 
  };
  
  try {
    const response = await api.get<HospitalApiResponse>('/hospitals', {
      params: defaultParams,
    });
    
    if (response.data.statusCode !== 200) {
        throw new Error(response.data.message || 'Failed to fetch hospitals with status code 200');
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {

      console.error('API Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Network error occurred while fetching hospitals.');
    }
    throw new Error('An unknown error occurred.');
  }
};