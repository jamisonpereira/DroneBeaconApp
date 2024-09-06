// services/ApiService.ts
import axios, { InternalAxiosRequestConfig } from 'axios';
import Constants from 'expo-constants';
import { getToken } from './AuthService';

// Define the base HTTPS URL for API requests
const HTTPS_URL =
  Constants.expoConfig?.extra?.NGROK_HTTPS_URL ||
  Constants.manifest?.extra?.NGROK_HTTPS_URL;

// Helper function to create an Axios instance with default settings
const apiClient = axios.create({
  baseURL: HTTPS_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the Authorization header to every request
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Retrieve the token securely
    const token = await getToken();
    if (token) {
      // Attach the token to the Authorization header
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    console.error('Error attaching token to request:', error);
    return Promise.reject(error);
  }
);

// Function to handle resupply requests
export const requestResupply = async (
  latitude: number | null,
  longitude: number | null,
  items?: string[] | null,
  priority?: string | null
) => {
  try {
    const response = await apiClient.post('/resupply/request', {
      latitude,
      longitude,
      items,
      priority,
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error('Resupply request failed:', error);
    throw error; // Propagate error for caller to handle
  }
};

// // Example function to make a GET request
// export const fetchData = async (endpoint: string) => {
//   try {
//     const response = await apiClient.get(endpoint);
//     return response.data;
//   } catch (error) {
//     console.error(`Failed to fetch data from ${endpoint}:`, error);
//     throw error; // Propagate error for caller to handle
//   }
// };

// // Function to make a POST request
// export const postData = async (endpoint: string, data: object) => {
//   try {
//     const response = await apiClient.post(endpoint, data);
//     return response.data;
//   } catch (error) {
//     console.error(`Failed to post data to ${endpoint}:`, error);
//     throw error; // Propagate error for caller to handle
//   }
// };

// // Function to make a DELETE request
// export const deleteData = async (endpoint: string) => {
//   try {
//     const response = await apiClient.delete(endpoint);
//     return response.data;
//   } catch (error) {
//     console.error(`Failed to delete data at ${endpoint}:`, error);
//     throw error; // Propagate error for caller to handle
//   }
// };
