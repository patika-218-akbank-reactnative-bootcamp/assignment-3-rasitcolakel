import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ChatScreen from '../screens/Chat';
import BottomNavigator from './BottomNavigator';

type Props = {};
const AppNav = createStackNavigator();

const AppNavigator: React.FC<Props> = () => {
  return (
    <AppNav.Navigator>
      <AppNav.Screen
        name="BottomNavigator"
        component={BottomNavigator}
        options={{
          headerShown: false,
        }}
      />
      <AppNav.Screen name="Chat" component={ChatScreen} />
    </AppNav.Navigator>
  );
};

export default AppNavigator;
