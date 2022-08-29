import React from 'react';
import {StyleSheet, Text, TouchableOpacityProps} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

type Props = TouchableOpacityProps & {
  onPress: () => void;
  text: string;
  style?: any;
};

const CustomButton = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.disabled}
      style={[styles.button, props.disabled ? styles.disabledButton : {}]}>
      <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#037EE5',
    padding: 15,
    margin: 5,
    borderRadius: 5,
    minWidth: '100%',
  },
  disabledButton: {
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CustomButton;
