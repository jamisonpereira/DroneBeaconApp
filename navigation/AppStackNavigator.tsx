import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getToken } from '../services/AuthService';
import LoginScreen from '../screens/LoginScreen';
import TabNavigator from './TabNavigator';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import { RootState } from '../state/store'; // Import the RootState type
import { setAuthentication } from '../state/slices/authSlice'; // Import the action

export type AppStackParamList = {
  Login: undefined; // No params for Login
  Main: undefined; // No params for Main
};

const Stack = createStackNavigator<AppStackParamList>();

const AppStackNavigator = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  ); // Access the auth state
  const dispatch = useDispatch(); // Initialize dispatch
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      dispatch(setAuthentication(!!token)); // Update the auth state based on token existence
      setLoading(false); // Set loading to false once the check is complete
    };

    checkAuth();
  }, [dispatch]);

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
