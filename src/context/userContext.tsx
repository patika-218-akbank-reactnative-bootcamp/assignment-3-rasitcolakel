// user context react native typescript
import React, {createContext, useContext, useReducer} from 'react';

const UserState = createContext<any>(null);

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
};

export type UserState = {
  user: User | null;
  login: (user: User) => void;
  logOut: () => void;
};

const initialState: UserState = {
  user: null,
  login: (user: User) => {},
  logOut: () => {},
};

export const UserContext = createContext<UserState>(initialState);

// useUserContext hook to access the user context
export const useUserContext = () => useContext(UserContext);
