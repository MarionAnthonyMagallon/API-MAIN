import { getAuthToken } from './auth';

// API base URL - adjust based on your environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Helper function to make API requests
 */
export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Set default headers
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  // Add authorization header if token exists
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  // Make the request
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  // Parse the JSON response
  const data = await response.json();
  
  // If the response is not ok, throw an error
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  
  return data;
};

/**
 * API functions for authentication
 */
export const authAPI = {
  login: async (username: string, password: string) => {
    return apiRequest('/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },
  
  register: async (name: string, email: string, password: string) => {
    return apiRequest('/users/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },
  
  getCurrentUser: async () => {
    return apiRequest('/me');
  },
};

/**
 * API functions for user management
 */
export const userAPI = {
  addUser: async (userData: { name: string; email: string; role: string }) => {
    return apiRequest('/add-user', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  
  getAllUsers: async () => {
    return apiRequest('/users');
  },
}; 