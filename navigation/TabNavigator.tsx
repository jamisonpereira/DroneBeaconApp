import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UnitScreen from '../screens/UnitScreen';
import BaseScreen from '../screens/BaseScreen';

export type RootTabParamList = {
  Unit: undefined; // No params for Unit
  Base: undefined; // No params for Base
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Unit"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: 50, // Adjust this value to make the tab bar thinner
          backgroundColor: '#1C2833', // Set tab bar background color
        },
        tabBarActiveTintColor: 'white', // Color of the active tab text (gold)
        tabBarInactiveTintColor: '#888888', // Color of the inactive tab text (light beige)
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: route.name === route.name ? 'bold' : 'normal', // Make active tab bold
        },
        // tabBarActiveBackgroundColor: '#3C4C61', // Background color of the active tab
        // tabBarInactiveBackgroundColor: '#2E3B4E', // Background color of inactive tabs
      })}
    >
      <Tab.Screen
        name="Unit"
        component={UnitScreen}
        options={{ headerShown: false }} // Hide the header
      />
      <Tab.Screen
        name="Base"
        component={BaseScreen}
        options={{ headerShown: false }} // Hide the header
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
