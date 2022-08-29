import {StyleSheet, TextInputProps} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';

type Props = TextInputProps & {
  fullWidth?: boolean;
};
const CustomInput = React.forwardRef((props: Props, ref: any) => {
  return (
    <TextInput
      placeholderTextColor={'#3c3c434d'}
      ref={ref}
      {...props}
      style={[
        props.style || {},
        styles.input,
        props.fullWidth ? styles.fullWidth : {},
      ]}
    />
  );
});

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#D8D8D8',
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  fullWidth: {
    flex: 1,
  },
});
