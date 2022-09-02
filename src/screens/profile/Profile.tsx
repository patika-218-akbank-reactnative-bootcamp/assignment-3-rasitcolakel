import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import CustomButton from '../../components/CustomButtom';
import List, {ListItem} from '../../components/List';
import {useThemeContext} from '../../context/themeContext';
import {useUserContext} from '../../context/userContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Image from 'react-native-fast-image';

const Profile = () => {
  const {colors} = useThemeContext();
  const {logOut, user} = useUserContext();
  const listItems: ListItem[] = [
    {
      icon: {name: 'edit', color: 'blue'},
      label: 'Edit Profile',
      onPress: () => {
        push('EditProfile');
      },
    },
    {
      icon: {name: 'adjust', color: 'green'},
      label: 'Apperance',
      onPress: () => {
        push('Appearance');
      },
      IconComponent: FontAwesome5,
    },
  ];

  const {push} = useNavigation<StackNavigationProp<any>>();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{uri: 'https://i.pravatar.cc/300'}}
          style={[styles.image, {borderColor: colors.secondary}]}
        />
        <Text style={[styles.profileText, {color: colors.text}]}>
          {user?.firstName + ' ' + user?.lastName}
        </Text>
        <View style={styles.profileSubTextContainer}>
          <Text style={[styles.profileSubText, {color: colors.textSecondary}]}>
            {user?.phone}
          </Text>
          <Text style={[styles.profileSubText, {color: colors.textSecondary}]}>
            •
          </Text>
          <Text style={[styles.profileSubText, {color: colors.textSecondary}]}>
            {'@' + user?.username}
          </Text>
        </View>
      </View>
      <List items={listItems} />
      <View style={styles.logOutContainer}>
        <CustomButton
          text="Sign Out"
          onPress={() => {
            logOut();
          }}
          variant="error"
          isOutlined={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '96%',
    marginHorizontal: '2%',
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  profileText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  profileSubTextContainer: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 10,
  },
  profileSubText: {
    fontSize: 16,
    paddingHorizontal: 5,
  },
  logOutContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginTop: 'auto',
  },
  image: {
    width: 170,
    height: 170,
    borderRadius: 100,
    borderWidth: 5,
  },
});
