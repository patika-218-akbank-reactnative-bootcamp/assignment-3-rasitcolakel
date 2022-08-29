import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {User, UserContext} from './src/context/userContext';
import Navigation from './src/navigation';

const App = () => {
  const [user, setUser] = React.useState<User | null>(null);

  const login = (user: User) => {
    setUser(user);
  };

  const logOut = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logOut,
      }}>
      <Navigation />
    </UserContext.Provider>
  );
};

export default App;
