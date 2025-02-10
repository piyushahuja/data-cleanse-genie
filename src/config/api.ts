const API_BASE_URL = import.meta.env.PROD 
  ? 'http://35.178.211.2:8000'
  : 'http://35.178.211.2:8000';

export const getApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
}; 