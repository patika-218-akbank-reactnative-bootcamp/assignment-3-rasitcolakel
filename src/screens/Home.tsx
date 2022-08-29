import {Text, View} from 'react-native';
import React from 'react';
import {useUserContext} from '../context/userContext';

type Props = {};

const Home: React.FC<Props> = () => {
  const {user} = useUserContext();
  return (
    <View>
      <Text>{user?.firstName}</Text>
    </View>
  );
};

export default Home;
