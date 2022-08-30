import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useRef, useState} from 'react';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButtom';
import {useUserContext} from '../../context/userContext';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = {};

const EditProfile: React.FC<Props> = () => {
  const {login, user} = useUserContext();

  const navigation = useNavigation<StackNavigationProp<any>>();

  const [firstName, setFirstName] = useState<string>(user?.firstName || '');
  const [lastName, setLastName] = useState<string>(user?.lastName || '');
  const [username, setUsername] = useState<string>(user?.username || '');

  const firstNameRef = useRef<any>(null);
  const lastNameRef = useRef<any>(null);
  const usernameRef = useRef<any>(null);

  const handleSubmit = () => {
    if (user === null) {
      return;
    }
    if (!(firstName.length > 0 && lastName.length > 0 && username.length > 0)) {
      return Alert.alert('Warning', 'Please fill all fields');
    }
    login({
      ...user,
      firstName,
      lastName,
      username,
    });
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.inputContainer}>
              <CustomInput
                ref={firstNameRef}
                placeholder="First Name"
                fullWidth
                onChangeText={text => {
                  setFirstName(text);
                }}
                value={firstName}
                returnKeyType="next"
                onSubmitEditing={() => {
                  lastNameRef.current.focus();
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <CustomInput
                ref={lastNameRef}
                placeholder="Last Name"
                fullWidth
                onChangeText={text => {
                  setLastName(text);
                }}
                value={lastName}
                returnKeyType="next"
                onSubmitEditing={() => {
                  usernameRef.current.focus();
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <CustomInput
                ref={usernameRef}
                placeholder="Username"
                fullWidth
                onChangeText={text => {
                  setUsername(text);
                }}
                value={username}
                returnKeyType="done"
              />
            </View>

            <View style={styles.inputContainer}>
              <CustomButton
                onPress={() => handleSubmit()}
                text={'Save'}
                disabled={
                  !(
                    firstName.length > 0 &&
                    lastName.length > 0 &&
                    username.length > 0
                  )
                }
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    marginVertical: 30,
  },
  picker: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  optionContaier: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    padding: 10,
    width: '100%',
  },
  inputContainer: {
    padding: 10,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  renderItem: {
    flex: 1,
    width: '100%',
  },
  phoneRight: {
    borderRightWidth: 1,
  },
});
export default EditProfile;
