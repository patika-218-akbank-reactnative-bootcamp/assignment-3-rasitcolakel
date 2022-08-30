import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from './Profile';
import Appearance from './Appearance';
import EditProfile from './EditProfile';

const Stack = createStackNavigator();
const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Profile"
        component={Profile}
      />
      <Stack.Screen
        options={{
          headerShadowVisible: false,
        }}
        name="Appearance"
        component={Appearance}
      />
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          title: 'Edit Profile',
        }}
        name="EditProfile"
        component={EditProfile}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
