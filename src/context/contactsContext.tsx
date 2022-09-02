// contacts context react native typescript
import {createContext, useContext} from 'react';
import {Contact} from '../assets/fakeDataMaker';

const ContactsState = createContext<any>(null);

export type ContactsState = {
  contacts: Contact[];
  chatContact: Contact | null;
  setContacts: (contacts: Contact[]) => void;
  setChatContact: (contacts: Contact) => void;
  sendMessage: (contact: Contact, message: string) => void;
  getNewContacts: () => void;
};

const initialState: ContactsState = {
  contacts: [],
  chatContact: null,
  setContacts: () => {},
  setChatContact: () => {},
  sendMessage: () => {},
  getNewContacts: () => {},
};

export const ContactsContext = createContext<ContactsState>(initialState);

// useContactsContext hook to access the contacts context
export const useContactsContext = () => useContext(ContactsContext);
