import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './state/store';
import AppStackNavigator from './navigation/AppStackNavigator'; // Import the stack navigator

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStackNavigator />
      </NavigationContainer>
    </Provider>
  );
}
