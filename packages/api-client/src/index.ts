import axiosLib, { AxiosInstance, AxiosError } from 'axios';

// Event emitter for session expiry
class SessionExpiredEvent extends Event {
  constructor() {
    super('session-expired');
  }
}

// Global event target for session expiry
const sessionEventTarget = new EventTarget();

// Create axios instance with base configuration
const getBaseURL = () => {
  // In browser, use relative URLs
  if (typeof window !== 'undefined') {
    return '/api';
  }
  
  // On server during build/SSR, use localhost
  const port = process.env.PORT || 3000;
  return process.env.NEXT_PUBLIC_API_BASE_URL || `http://localhost:${port}/api`;
};

const axios: AxiosInstance = axiosLib.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token injection
axios.interceptors.request.use(
  (config) => {
    // In a real app, you'd get the token from storage, context, or cookies
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for session expiry detection and error normalization
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle 401 Unauthorized - session expired
    if (error.response?.status === 401) {
      // Emit session expired event
      sessionEventTarget.dispatchEvent(new SessionExpiredEvent());
      
      // Clear any stored auth token
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
      }
    }
    
    // Normalize error object
    const normalizedError = {
      message: error.message || 'An error occurred',
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      code: error.code,
    };
    
    return Promise.reject(normalizedError);
  }
);

// Helper function to listen for session expiry
export function onSessionExpired(callback: () => void): () => void {
  const handleSessionExpired = () => callback();
  sessionEventTarget.addEventListener('session-expired', handleSessionExpired);
  
  // Return cleanup function
  return () => {
    sessionEventTarget.removeEventListener('session-expired', handleSessionExpired);
  };
}

export { axios };
export default axios;