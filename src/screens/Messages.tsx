import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {Contact, shortDate} from '../assets/fakeDataMaker';
import {useThemeContext} from '../context/themeContext';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {useContactsContext} from '../context/contactsContext';
import Image from 'react-native-fast-image';

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

const MessagesScreen: React.FC<Props> = ({navigation}: Props) => {
  const {contacts, setChatContact} = useContactsContext();
  const {colors} = useThemeContext();

  const [contactsWithMessages, setContactsWithMessages] = React.useState<
    Contact[]
  >([]);

  useEffect(() => {
    const _contactsWithMessages = contacts
      .filter(contact => {
        return contact.messageList.length > 0;
      })
      .sort((a, b) => {
        const lastMessgeA = a.messageList[a.messageList.length - 1].date;
        const lastMessgeB = b.messageList[b.messageList.length - 1].date;
        return +new Date(lastMessgeB) - +new Date(lastMessgeA);
      });
    setContactsWithMessages(_contactsWithMessages);
  }, [contacts]);

  const goToChatScreen = (contact: Contact) => {
    setChatContact(contact);
    navigation.navigate('Chat');
  };

  return (
    <>
      <FlatList
        initialNumToRender={10}
        data={contactsWithMessages}
        renderItem={({item}) => (
          <MessageCard contact={item} onPress={() => goToChatScreen(item)} />
        )}
        keyExtractor={item => item.name}
        ItemSeparatorComponent={() => (
          <View
            style={[styles.separator, {backgroundColor: colors.secondary}]}
          />
        )}
        maxToRenderPerBatch={3}
        removeClippedSubviews={true}
        windowSize={10}
      />
    </>
  );
};

type MessageCardProps = {
  contact: Contact;
  onPress: () => void;
};

const MessageCard = ({contact, onPress}: MessageCardProps) => {
  const {colors} = useThemeContext();
  const lastMessage = contact.messageList[contact.messageList.length - 1];
  return (
    <TouchableOpacity style={styles.contactContainer} onPress={onPress}>
      <Image
        source={{
          uri: `https://i.pravatar.cc/100?u${contact.id}`,
        }}
        style={[styles.image, {borderColor: colors.secondary}]}
      />
      <View style={styles.labelContainer}>
        <Text style={[styles.label, {color: colors.text}]}>{contact.name}</Text>
        <Text
          style={[styles.lastSeen, {color: colors.textSecondary}]}
          numberOfLines={2}
          ellipsizeMode="tail">
          {lastMessage.message}
        </Text>
      </View>
      <View>
        <Text
          style={[
            styles.lastSeen,
            styles.dateText,
            {color: colors.textSecondary},
          ]}>
          {shortDate(lastMessage.date)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 100,
    borderWidth: 3,
    marginRight: 10,
  },
  labelContainer: {
    flex: 1,
  },
  label: {
    fontSize: 18,
  },
  lastSeen: {
    fontSize: 13,
    fontWeight: '300',
  },
  dateText: {
    fontSize: 13,
    alignSelf: 'flex-start',
    flex: 1,
    padding: 5,
  },
  separator: {
    height: 1,
  },
  popoverContainer: {
    borderRadius: 10,
    minWidth: 200,
    margin: 2,
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  popoverButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  popoverText: {
    fontSize: 17,
  },
});
export default MessagesScreen;
