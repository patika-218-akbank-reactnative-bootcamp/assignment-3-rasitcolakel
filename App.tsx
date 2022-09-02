import React, {useEffect} from 'react';
import {User, UserContext} from './src/context/userContext';
import Navigation from './src/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Appearance} from 'react-native';
import {Theme, ThemeContext} from './src/context/themeContext';
import {darkTheme, lightTheme} from './src/theme';
import {ContactsContext} from './src/context/contactsContext';
import {Contact, setMessage} from './src/assets/fakeDataMaker';

const App = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [theme, setTheme] = React.useState<Theme | null>(null);
  const [contacts, setContacts] = React.useState<Contact[]>([]);
  const [chatContact, setChatContact] = React.useState<Contact | null>(null);
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

    AsyncStorage.getItem('theme').then(_theme => {
      if (_theme) {
        setTheme(JSON.parse(_theme));
      } else {
        const colorScheme = Appearance.getColorScheme();
        setTheme(colorScheme === 'dark' ? Theme.DARK : Theme.LIGHT);
        AsyncStorage.setItem('theme', JSON.stringify(colorScheme));
      }
    });
  }, []);

  useEffect(() => {
    // save theme to async storage
    AsyncStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  const toogleTheme = () => {
    setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  };

  const sendMessage = (contact: Contact, message: string) => {
    if (contacts) {
      const newContacts = contacts.map(c => {
        if (c.id === contact.id) {
          c.messageList.push(setMessage(message, true));

          return {...c, message};
        }
        return c;
      });
      setContacts(newContacts);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logOut,
      }}>
      <ThemeContext.Provider
        value={{
          theme,
          setTheme: toogleTheme,
          colors: theme === Theme.DARK ? darkTheme : lightTheme,
        }}>
        <ContactsContext.Provider
          value={{
            contacts,
            setContacts,
            sendMessage,
            chatContact,
            setChatContact,
          }}>
          <Navigation />
        </ContactsContext.Provider>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
