import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {};

const ChatScreen: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Text>Chat Screen</Text>
    </View>
  );
};

export default ChatScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
