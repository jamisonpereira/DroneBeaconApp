import Constants from 'expo-constants';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const HTTPS_URL =
  Constants.expoConfig?.extra?.HTTPS_URL ||
  Constants.manifest?.extra?.HTTPS_URL;

// Function to perform login and store JWT token securely
export const login = async (username: string, password: string) => {
  console.log('Logging in to address: ', HTTPS_URL);
  try {
    // Send user credentials to the server to obtain JWT token
    const response = await axios.post(`${HTTPS_URL}/login`, {
      username,
      password,
    });

    if (response.data.token) {
      // Store the token securely using Keychain
      await SecureStore.setItemAsync('jwt_token', response.data.token);
      console.log('Token stored securely');
    } else {
      console.error('No token received from the server');
    }
  } catch (error) {
    console.error('Failed to login:', error);
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
