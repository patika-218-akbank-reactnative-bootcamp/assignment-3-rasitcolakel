import React from 'react';
import {StyleSheet, Text, TouchableOpacityProps} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useThemeContext} from '../context/themeContext';

type Props = TouchableOpacityProps & {
  onPress: () => void;
  text: string;
  style?: any;
  variant?: 'primary' | 'error' | 'success' | 'link';
  isOutlined?: boolean;
  borderRadius?: number;
};

const CustomButton = (props: Props) => {
  const {colors} = useThemeContext();
  const colorMap = {
    primary: colors.blue,
    error: colors.red,
    success: colors.green,
    link: '',
  };
  let backgroundColor = colorMap[props.variant || 'primary'];

  let textColor = colors.text;
  let borderRadius = props.borderRadius ? props.borderRadius : 0;
  if (props.disabled) {
    backgroundColor = colors.gray;
  }
  if (props.isOutlined) {
    textColor = colorMap[props.variant || 'primary'];
    backgroundColor = 'transparent';
  } else {
    textColor = colors.white;
  }
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.disabled}
      style={[styles.button, {backgroundColor, borderRadius}]}>
      <Text style={[styles.buttonText, {color: textColor}]}>{props.text}</Text>
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
