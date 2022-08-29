import {createStackNavigator} from '@react-navigation/stack';

const AuthStack = createStackNavigator();

import React from 'react';
import Login from '../screens/Login';

type Props = {};

const AuthNavigator: React.FC<Props> = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
