import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import {Contact, dateToString, generateContacts} from '../assets/fakeDataMaker';
import {useThemeContext} from '../context/themeContext';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import Popover, {PopoverPlacement} from 'react-native-popover-view';
import Feather from 'react-native-vector-icons/Feather';
import {useContactsContext} from '../context/contactsContext';
import Image from 'react-native-fast-image';

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

const ContactsScreen: React.FC<Props> = ({navigation}: Props) => {
  const {contacts, setContacts, setChatContact} = useContactsContext();
  const [showPopover, setShowPopover] = React.useState<boolean>(false);
  const {colors, theme} = useThemeContext();
  const [sortType, setSortType] = React.useState<'name' | 'date'>('date');
  useEffect(() => {
    if (contacts !== null && contacts.length !== 0) {
      return;
    }
    let _contacts = generateContacts(20);
    _contacts = _contacts.sort((a, b) => {
      return a.lastSeen > b.lastSeen ? -1 : 1;
    });

    setContacts(_contacts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Popover
          onRequestClose={() => setShowPopover(false)}
          isVisible={showPopover}
          placement={PopoverPlacement.BOTTOM}
          from={<Button title="Sort" onPress={() => setShowPopover(true)} />}
          popoverStyle={{backgroundColor: 'transparent'}}
          backgroundStyle={{backgroundColor: 'transparent'}}
          arrowSize={{width: 0, height: 0}}>
          <View
            style={[
              styles.popoverContainer,
              {
                backgroundColor: colors.secondary,
                shadowColor: colors.background,
              },
            ]}>
            <TouchableOpacity
              style={styles.popoverButton}
              onPress={() => sortByDate()}>
              <Text style={[styles.popoverText, {color: colors.text}]}>
                by Last Seen
              </Text>
              {sortType === 'date' && (
                <Feather name="check" size={20} color={colors.text} />
              )}
            </TouchableOpacity>
            <View
              style={[
                styles.separator,
                {backgroundColor: colors.textSecondary, opacity: 0.1},
              ]}
            />
            <TouchableOpacity
              style={styles.popoverButton}
              onPress={() => sortByName()}>
              <Text style={[styles.popoverText, {color: colors.text}]}>
                by Name
              </Text>
              {sortType === 'name' && (
                <Feather name="check" size={20} color={colors.text} />
              )}
            </TouchableOpacity>
          </View>
        </Popover>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, theme, sortType, showPopover]);

  const goToChatScreen = (contact: Contact) => {
    setChatContact(contact);
    navigation.navigate('Chat');
  };

  const sortByName = () => {
    setShowPopover(false);
    if (sortType === 'date' && contacts) {
      setSortType('name');
      setContacts(
        contacts.sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        }),
      );
    }
  };

  const sortByDate = () => {
    setShowPopover(false);
    if (sortType !== 'date' && contacts) {
      setSortType('date');
      setContacts(
        contacts.sort((a, b) => {
          return a.lastSeen > b.lastSeen ? -1 : 1;
        }),
      );
    }
  };

  const onEndReached = () => {
    setContacts([...contacts, ...generateContacts(20)]);
  };

  return (
    <>
      <FlatList
        data={contacts}
        renderItem={({item}) => (
          <ContactCard contact={item} onPress={() => goToChatScreen(item)} />
        )}
        keyExtractor={item => item.name}
        ItemSeparatorComponent={() => (
          <View
            style={[styles.separator, {backgroundColor: colors.secondary}]}
          />
        )}
        onEndReached={onEndReached}
        maxToRenderPerBatch={10}
      />
    </>
  );
};

type ContactCardProps = {
  contact: Contact;
  onPress: () => void;
};

const ContactCard = ({contact, onPress}: ContactCardProps) => {
  const {colors} = useThemeContext();
  return (
    <TouchableOpacity style={styles.contactContainer} onPress={onPress}>
      <Image
        source={{
          uri: `https://i.pravatar.cc/100?u${contact.id}`,
        }}
        style={[styles.image, {borderColor: colors.secondary}]}
      />
      <View>
        <Text style={[styles.label, {color: colors.text}]}>{contact.name}</Text>
        <Text style={[styles.lastSeen, {color: colors.textSecondary}]}>
          last seen {dateToString(contact.lastSeen)}
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
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 3,
    marginRight: 10,
  },
  label: {
    fontSize: 18,
  },
  lastSeen: {
    fontSize: 13,
    fontWeight: '300',
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
export default ContactsScreen;
