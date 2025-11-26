export interface Hospital {
  id: number;
  hospitalName: string;
  logoUrl: string | null;
  hospitalEmail: string | null;
  phoneNumber: string | null;
  address: string | null;
  type: string;
  longitude: number;
  latitude: number;
  country: string;
  countryId: string;
  countryCode: string;
  state: string;
  distanceInMeters: number;
  distanceInKm: number;
  formattedDistance: string | null;
}


export interface PaginationMeta {
  totalCount: number;
  page: number;
  perPage: number;
  totalPages: number;
}


export interface HospitalData {
  data: Hospital[];
  totalCount: number; 
  page: number;
  perPage: number;
  totalPages: number;
}


export interface HospitalApiResponse {
  message: string;
  statusCode: number;
  data: HospitalData;
}


export interface HospitalSearchParams {
    countryId: number; 
    page: number;
    perPage: number; 
    sortBy: 'id'; 
    sortDirection: 'desc';
    search?: string; 
    type?: string;
    state?: string;
}