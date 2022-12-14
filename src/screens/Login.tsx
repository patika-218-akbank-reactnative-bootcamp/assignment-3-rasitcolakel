import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useRef, useState} from 'react';
import phoneCodes from '../assets/phoneCodes.json';
import ModalPicker from '../components/ModalPicker';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButtom';
import {useUserContext} from '../context/userContext';
import {useThemeContext} from '../context/themeContext';
type PhoneCode = {
  code: string;
  name: string;
  dial_code: string;
};
type Props = {};

function formatPhoneNumber(phone: string): string {
  const cleaned = ('' + phone).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return match[1] + ' ' + match[2] + ' ' + match[3];
  }
  return phone;
}

const unfilteredPhoneCodes = phoneCodes as PhoneCode[];

const Login: React.FC<Props> = () => {
  const [allCodes, setAllCodes] = useState<PhoneCode[]>(phoneCodes);
  const [countryCode, setCountryCode] = useState<string>('+90');
  const [countryCodeModal, setCountryCodeModal] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const phoneRef = useRef<any>(null);
  const firstNameRef = useRef<any>(null);
  const lastNameRef = useRef<any>(null);
  const usernameRef = useRef<any>(null);

  const {colors} = useThemeContext();
  const {login} = useUserContext();

  const handleSubmit = () => {
    if (
      !(
        firstName.length > 0 &&
        lastName.length > 0 &&
        username.length > 0 &&
        phone.length > 0
      )
    ) {
      return Alert.alert('Warning', 'Please fill all fields');
    }
    login({
      id: Math.random().toString(),
      phone: countryCode + ' ' + phone,
      firstName,
      lastName,
      username,
    });
  };
  const renderItem = ({item}: {item: PhoneCode}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setCountryCode(item.dial_code);
          setCountryCodeModal(false);
        }}
        style={[styles.optionContaier, {borderBottomColor: colors.gray}]}>
        <Text style={[styles.renderItem, {color: colors.text}]}>
          {item.dial_code + ' - ' + item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const search = (text: string) => {
    const filtered = unfilteredPhoneCodes.filter((item: PhoneCode) =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
    setAllCodes(() => filtered);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Text style={styles.headerText}>Log In</Text>
            <View style={styles.inputContainer}>
              <CustomInput
                onPressIn={() => {
                  setCountryCodeModal(true);
                }}
                value={countryCode}
                placeholder="Country Code"
                style={styles.phoneRight}
              />
              <CustomInput
                ref={phoneRef}
                placeholder="Your Phone Number"
                fullWidth
                onChangeText={text => {
                  setPhone(formatPhoneNumber(text));
                }}
                value={phone}
                keyboardType="phone-pad"
                returnKeyType="done"
                onSubmitEditing={() => {
                  firstNameRef.current.focus();
                }}
              />
            </View>
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
                text={'Log In'}
                disabled={
                  !(
                    firstName.length > 0 &&
                    lastName.length > 0 &&
                    username.length > 0 &&
                    phone.length > 0
                  )
                }
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <ModalPicker<PhoneCode>
        search={search}
        items={allCodes}
        isOpen={countryCodeModal}
        renderItem={renderItem}
        keyExtractor={(item: PhoneCode) => item.code}
      />
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
export default Login;
