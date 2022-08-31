import {Text, View} from 'react-native';
import React from 'react';
import {useUserContext} from '../context/userContext';

type Props = {};

const MessagesScreen: React.FC<Props> = () => {
  const {user} = useUserContext();
  return (
    <View>
      <Text>{user?.firstName} Messages</Text>
    </View>
  );
};

export default MessagesScreen;
