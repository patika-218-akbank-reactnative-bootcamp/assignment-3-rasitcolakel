import React from 'react';
import {StyleSheet, Text, TouchableOpacityProps} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useThemeContext} from '../context/themeContext';

type Props = TouchableOpacityProps & {
  onPress: () => void;
  text: string;
  style?: any;
};

const CustomButton = (props: Props) => {
  const {colors} = useThemeContext();
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.disabled}
      style={[
        styles.button,
        {backgroundColor: colors.blue},
        props.disabled ? {backgroundColor: colors.secondary} : {},
      ]}>
      <Text style={[styles.buttonText, {color: colors.text}]}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    margin: 5,
    borderRadius: 5,
    minWidth: '100%',
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CustomButton;
