import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UnitScreen from '../screens/UnitScreen';
import BaseScreen from '../screens/BaseScreen';

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator initialRouteName="Unit">
      <Tab.Screen
        name="Unit"
        component={UnitScreen}
      />
      <Tab.Screen
        name="Base"
        component={BaseScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
