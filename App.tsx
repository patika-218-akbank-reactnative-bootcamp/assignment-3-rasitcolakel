import React, {useEffect} from 'react';
import {User, UserContext} from './src/context/userContext';
import Navigation from './src/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [user, setUser] = React.useState<User | null>(null);

  const login = async (_user: User) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(_user));
      // save user to async storage
      setUser(_user);
    } catch (e) {
      console.log(e);
    }
  };

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // get user from async storage, whether user is logged in or not
    AsyncStorage.getItem('user').then(_user => {
      if (_user) {
        setUser(JSON.parse(_user));
      }
    });
  }, []);

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
