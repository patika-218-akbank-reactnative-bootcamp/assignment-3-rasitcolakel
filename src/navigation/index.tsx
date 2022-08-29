import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useUserContext} from '../context/userContext';
import AuthNavigator from './Auth';
import BottomNavigator from './BottomNavigator';

export default function Navigation() {
  const {user} = useUserContext();
  console.log('user', user);
  return (
    <NavigationContainer>
      {user ? <BottomNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
