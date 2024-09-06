import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getToken } from '../services/AuthService'; // Import the function to retrieve the token
import LoginScreen from '../screens/LoginScreen'; // Import your login screen
import TabNavigator from './TabNavigator'; // Import your existing TabNavigator

const Stack = createStackNavigator();

const AppStackNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      setIsAuthenticated(!!token); // Set authentication state based on token existence
      setLoading(false); // Set loading to false once the check is complete
    };

    checkAuth();
  }, []);

  // Show a loading screen or spinner while checking authentication
  if (loading) {
    return null; // or render a loading spinner
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen
          name="Main"
          component={TabNavigator}
        />
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
      )}
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
