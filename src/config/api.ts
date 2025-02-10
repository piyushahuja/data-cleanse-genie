const API_BASE_URL = import.meta.env.PROD 
  ? 'https://datakleen.com'
  : 'https://datakleen.com';

export const getApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
}; 