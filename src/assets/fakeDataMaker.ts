import {faker} from '@faker-js/faker';
import moment from 'moment';

export type Contact = {
  id: string;
  name: string;
  lastSeen: Date;
};

export const generateContact = (): Contact => {
  return {
    id: faker.random.alphaNumeric(25),
    name: faker.name.fullName(),
    lastSeen: faker.date.recent(),
  };
};

export const dateToString = (date: Date): string => {
  return moment(date).fromNow();
};

export const generateContacts = (count: number = 10): Contact[] => {
  const contacts: Contact[] = [];
  for (let i = 0; i < count; i++) {
    contacts.push(generateContact());
  }
  return contacts;
};
