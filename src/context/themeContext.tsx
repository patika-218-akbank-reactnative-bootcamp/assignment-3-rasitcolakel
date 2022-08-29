// theme context react native typescript
import {createContext, useContext} from 'react';
import {lightTheme, ThemeColors} from '../theme';

const ThemeState = createContext<any>(null);

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}
export type ThemeState = {
  theme: Theme | null;
  setTheme: (theme: Theme) => void;
  colors: ThemeColors;
};

const initialState: ThemeState = {
  theme: null,
  setTheme: (_theme: string) => {},
  colors: lightTheme,
};

export const ThemeContext = createContext<ThemeState>(initialState);

// useThemeContext hook to access the theme context
export const useThemeContext = () => useContext(ThemeContext);
