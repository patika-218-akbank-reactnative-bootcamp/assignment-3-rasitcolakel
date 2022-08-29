// user context react native typescript
import {createContext, useContext} from 'react';

const UserState = createContext<any>(null);

export type User = {
  id: string;
  phone: string;
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
  login: (_user: User) => {},
  logOut: () => {},
};

export const UserContext = createContext<UserState>(initialState);

// useUserContext hook to access the user context
export const useUserContext = () => useContext(UserContext);
