import {faker} from '@faker-js/faker';
import moment from 'moment';

export type Contact = {
  id: string;
  name: string;
  lastSeen: Date;
  lastMessageDate: Date | null;
  messageList: Message[];
};

export type Message = {
  id: string;
  message: string;
  date: Date;
  isMe: boolean;
};

export const generateContact = (): Contact => {
  return {
    id: faker.random.alphaNumeric(25),
    name: faker.name.fullName(),
    lastSeen: faker.date.recent(),
    messageList: generateMessages(faker.datatype.number({min: 0, max: 5})),
    lastMessageDate: null,
  };
};

export const setMessage = (message: string, isMe: boolean = false): Message => {
  return {
    id: faker.random.alphaNumeric(25),
    message: message,
    date: new Date(),
    isMe,
  };
};

export const dateToString = (date: Date): string => {
  return moment(date).fromNow();
};

export const hoursAndMinutes = (date: Date): string => {
  return moment(date).format('HH:mm');
};

export const generateContacts = (count: number = 10): Contact[] => {
  const contacts: Contact[] = [];
  for (let i = 0; i < count; i++) {
    contacts.push(generateContact());
  }
  return contacts;
};

export const generateMessages = (count: number = 10): Message[] => {
  const messages: Message[] = [];
  for (let i = 0; i < count; i++) {
    messages.push(setMessage(faker.lorem.words(3), i % 2 === 0));
  }
  return messages;
};
