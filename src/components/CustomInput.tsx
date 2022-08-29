import {StyleSheet, TextInputProps} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {useThemeContext} from '../context/themeContext';

type Props = TextInputProps & {
  fullWidth?: boolean;
};
const CustomInput = React.forwardRef((props: Props, ref: any) => {
  const {colors} = useThemeContext();
  return (
    <TextInput
      placeholderTextColor={colors.textSecondary}
      ref={ref}
      {...props}
      style={[
        props.style || {},
        styles.input,
        props.fullWidth ? styles.fullWidth : {},
        {borderColor: colors.gray, color: colors.text},
      ]}
    />
  );
});

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  fullWidth: {
    flex: 1,
  },
});
