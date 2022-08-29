// theme context react native typescript
import React, {createContext, useContext, useReducer} from 'react';

const ThemeState = createContext<any>(null);

export type Theme = {
  id: string;
  firstName: string;
  lastName: string;
  themename: string;
};

export type ThemeState = {
  theme: Theme | null;
  login: (theme: Theme) => void;
  logOut: () => void;
};

const initialState: ThemeState = {
  theme: null,
  login: (theme: Theme) => {},
  logOut: () => {},
};

export const ThemeContext = createContext<ThemeState>(initialState);

// useThemeContext hook to access the theme context
export const useThemeContext = () => useContext(ThemeContext);
