// theme context react native typescript
import {createContext, useContext} from 'react';

const ThemeState = createContext<any>(null);

export type Theme = {
  id: string;
  firstName: string;
  lastName: string;
  themename: string;
};

export type ThemeState = {
  theme: Theme | null;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeState = {
  theme: null,
  setTheme: (_theme: Theme) => {},
};

export const ThemeContext = createContext<ThemeState>(initialState);

// useThemeContext hook to access the theme context
export const useThemeContext = () => useContext(ThemeContext);
