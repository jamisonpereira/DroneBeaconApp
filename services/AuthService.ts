import Constants from 'expo-constants';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const HTTPS_URL =
  Constants.expoConfig?.extra?.NGROK_HTTPS_URL ||
  Constants.manifest?.extra?.NGROK_HTTPS_URL;

// Function to perform login and store JWT token securely
export const login = async (username: string, password: string) => {
  console.log('Logging in to address: ', HTTPS_URL);
  try {
    // Send user credentials to the server to obtain JWT token
    const response = await axios.post(`${HTTPS_URL}/auth/login`, {
      username,
      password,
    });

    if (response.data.token) {
      // Store the token securely using Keychain
      await SecureStore.setItemAsync('jwt_token', response.data.token);
      console.log('Login successful: Token stored securely');
      return true; // Indicate login success
    } else {
      console.error('No token received from the server');
      return false; // Indicate login failure
    }
  } catch (error) {
    console.error('Failed to login:', error);
    // throw new Error('Login failed'); // Throw error to be caught in LoginScreen
  }
};

// Function to retrieve JWT token securely from Keychain
export const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync('jwt_token');
    if (token) {
      console.log('Token retrieved securely');
      return token;
    } else {
      console.log('No token found');
      return null;
    }
  } catch (error) {
    console.error('Failed to retrieve token securely:', error);
    return null;
  }
};

// Function to remove JWT token securely from Keychain
export const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync('jwt_token');
    console.log('Token removed securely');
  } catch (error) {
    console.error('Failed to securely remove the token:', error);
  }
};
