// Centralize configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.PROD 
    ? 'https://your-production-api-url.com/api'
    : 'http://localhost:3000/api'
};