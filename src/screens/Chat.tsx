import {NavigationProp, ParamListBase} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useRef} from 'react';
import {
  ImageBackground,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {hoursAndMinutes, Message} from '../assets/fakeDataMaker';
import {useContactsContext} from '../context/contactsContext';
import {Theme, useThemeContext} from '../context/themeContext';
import Image from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';
type Props = {
  navigation: NavigationProp<ParamListBase>;
};

const ChatScreen: React.FC<Props> = ({navigation}: Props) => {
  const {contacts, chatContact, sendMessage} = useContactsContext();
  const {colors, theme} = useThemeContext();
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);
  const [messageInputHeight, setMessageInputHeight] = React.useState(0);
  const [message, setMessage] = React.useState('');
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', e => {
      setTimeout(() => {
        setKeyboardHeight(e.endCoordinates.height);
        if (flatListRef.current) {
          flatListRef.current.scrollToItem({
            item: messageList ? messageList.length - 1 : 0,
            animated: true,
          });
        }
      }, 100);
    });
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      console.log('keyboard will hide');
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (chatContact !== null) {
      navigation.setOptions({
        headerRight: () => (
          <Image
            source={{
              uri: `https://i.pravatar.cc/100?u${chatContact.id}`,
            }}
            style={[styles.image, {borderColor: colors.secondary}]}
          />
        ),
        title: chatContact.name,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);
  const sentMessageBackground =
    theme === Theme.DARK ? colors.blue : colors.green;
  const receivedMessageBackground =
    theme === Theme.DARK ? colors.secondary : colors.secondary;

  if (!chatContact) {
    return null;
  }
  const renderItem = ({item}: {item: Message}) => (
    <View
      style={[
        styles.messageContainer,
        item.isMe ? styles.sentMessage : styles.receivedMessage,
        {
          backgroundColor: item.isMe
            ? sentMessageBackground
            : receivedMessageBackground,
        },
      ]}>
      <Text style={[styles.messageText, {color: colors.text}]}>
        {item.message}
      </Text>
      <Text style={[styles.messageDate, {color: colors.text}]}>
        {hoursAndMinutes(item.date)}
      </Text>
    </View>
  );
  console.log('heights', keyboardHeight, messageInputHeight);
  const messageList = contacts.find(c => c.id === chatContact.id)?.messageList;
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.secondary}]}>
      <ImageBackground
        source={
          theme === Theme.DARK
            ? require('../assets/dark-bg.jpeg')
            : require('../assets/light-bg.jpeg')
        }
        resizeMode="cover"
        style={styles.bgImage}>
        <FlatList
          ref={flatListRef}
          data={messageList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={[
            styles.list,
            keyboardHeight
              ? {bottom: keyboardHeight + messageInputHeight / 2}
              : {},
          ]}
          inverted
          contentContainerStyle={{flexDirection: 'column-reverse'}}
        />
      </ImageBackground>
      <View
        style={[
          styles.inputContainer,
          {backgroundColor: colors.secondary},
          keyboardHeight ? {bottom: keyboardHeight, position: 'absolute'} : {},
        ]}
        onLayout={e => {
          setMessageInputHeight(e.nativeEvent.layout.height);
        }}>
        <TextInput
          placeholder="Message"
          style={[
            styles.input,
            {backgroundColor: colors.background, color: colors.text},
          ]}
          onChangeText={text => setMessage(text)}
          value={message}
          placeholderTextColor={colors.textSecondary}
        />
        <TouchableOpacity
          style={[
            styles.iconContainer,
            {backgroundColor: message.length ? colors.blue : colors.gray},
          ]}
          disabled={!message.length}
          onPress={() => {
            if (flatListRef.current) {
              console.log('scroll to bottom');
              flatListRef.current.scrollToIndex({
                index: messageList ? messageList.length - 1 : 0,
              });
            }
            sendMessage(chatContact, message);
            setMessage('');
          }}>
          <Feather name="arrow-up" style={styles.icon} color={colors.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 10,
    borderRadius: 20,
  },
  sentMessage: {
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  messageDate: {
    fontSize: 10,
    alignSelf: 'flex-end',
    paddingLeft: 10,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 100,
    borderWidth: 3,
    marginRight: 10,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    width: '100%',
    paddingHorizontal: 5,
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 30,
    margin: 10,
    padding: 5,
    borderRadius: 20,
  },
  iconContainer: {
    padding: 7,
    borderRadius: 30,
    fontSize: 20,
  },
  icon: {
    fontSize: 20,
  },
});
