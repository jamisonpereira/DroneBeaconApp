import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './state/store';
import AppStackNavigator from './navigation/AppStackNavigator'; // Import the stack navigator
import { removeToken } from './services/AuthService'; // Import the removeToken function

export default function App() {
  useEffect(() => {
    // Remove the stored token when the app starts (for testing purposes)
    const clearStoredToken = async () => {
      await removeToken();
      console.log('Token cleared on app start.');
    };

    clearStoredToken();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStackNavigator />
      </NavigationContainer>
    </Provider>
  );
}
