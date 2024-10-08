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
