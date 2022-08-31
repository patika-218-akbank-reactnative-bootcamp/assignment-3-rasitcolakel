import * as React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {useUserContext} from '../context/userContext';
import AuthNavigator from './Auth';
import {Theme, useThemeContext} from '../context/themeContext';
import {StatusBar} from 'react-native';
import AppNavigator from './AppNavigator';

export default function Navigation() {
  const {user} = useUserContext();
  const {colors, theme} = useThemeContext();
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        dark: theme === Theme.DARK,
        colors: {
          ...DefaultTheme.colors,
          background: colors.background,
          card: colors.secondary,
          text: colors.text,
        },
      }}>
      <StatusBar
        barStyle={`${theme === Theme.DARK ? 'light' : 'dark'}-content`}
      />
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
