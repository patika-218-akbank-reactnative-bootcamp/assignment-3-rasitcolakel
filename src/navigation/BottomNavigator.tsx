// create a bottom navigation bar
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../screens/Home';

const BottomTabs = createBottomTabNavigator();

type Props = {};

const BottomNavigator: React.FC<Props> = () => {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="Home" component={Home} />
    </BottomTabs.Navigator>
  );
};

export default BottomNavigator;
