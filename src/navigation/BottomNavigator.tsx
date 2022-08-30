// create a bottom navigation bar
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../screens/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileStack from '../screens/profile/index';
const BottomTabs = createBottomTabNavigator();

type Props = {};

const BottomNavigator: React.FC<Props> = () => {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen
        name="Contacts"
        component={Home}
        options={{
          tabBarStyle: {
            borderTopWidth: 0,
            borderTopColor: 'transparent',
          },
          headerShadowVisible: false,
          tabBarLabel: 'Contacts',
          tabBarIcon: ({color, size, focused}) => (
            <Ionicons
              name={`ios-person-circle${focused ? '' : '-outline'}`}
              color={color}
              size={size + 5}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Messages"
        component={Home}
        options={{
          tabBarStyle: {
            borderTopWidth: 0,
            borderTopColor: 'transparent',
          },
          headerShadowVisible: false,
          tabBarLabel: 'Messages',
          tabBarIcon: ({color, size, focused}) => (
            <Ionicons
              name={`chatbubbles${focused ? '' : '-outline'}`}
              color={color}
              size={size + 5}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarStyle: {
            borderTopWidth: 0,
            borderTopColor: 'transparent',
          },
          headerShown: false,
          headerShadowVisible: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size, focused}) => (
            <Ionicons
              name={`settings${focused ? '' : '-outline'}`}
              color={color}
              size={size + 5}
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default BottomNavigator;
