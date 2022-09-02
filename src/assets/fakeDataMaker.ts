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
    id: faker.random.alphaNumeric(40),
    name: faker.name.fullName(),
    lastSeen: faker.date.between(
      moment().subtract(15, 'days').toDate(),
      moment().toDate(),
    ),
    messageList: generateMessages(faker.datatype.number({min: 0, max: 5})),
    lastMessageDate: null,
  };
};

export const generateMessage = (
  message: string,
  isMe: boolean = false,
  randomDate: boolean = true,
): Message => {
  return {
    id: faker.random.alphaNumeric(40),
    message: message,
    date: randomDate
      ? faker.date.between(
          moment().subtract(15, 'days').toDate(),
          moment().toDate(),
        )
      : new Date(),
    isMe,
  };
};

export const dateToString = (date: Date): string => {
  return moment(date).fromNow();
};

export const hoursAndMinutes = (date: Date): string => {
  return moment(date).format('HH:mm');
};

export const shortDate = (date: Date): string => {
  if (moment(date).isSame(moment(), 'day')) {
    return hoursAndMinutes(date);
  }

  if (moment(date).isSame(moment(), 'week')) {
    return moment(date).format('ddd');
  }
  return moment(date).format('DD.MM');
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
    messages.push(
      generateMessage(
        faker.random.words(faker.datatype.number({min: 1, max: 20})),
        i % 2 === 0,
      ),
    );
  }
  return messages;
};
