import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import {useThemeContext} from '../../context/themeContext';
import {darkTheme, lightTheme, ThemeColors} from '../../theme';

type Props = {};

const appearances = [
  {
    name: 'light',
    colors: lightTheme,
  },
  {
    name: 'dark',
    colors: darkTheme,
  },
];

export default function Appearance({}: Props) {
  const {theme, setTheme} = useThemeContext();
  return (
    <View style={styles.container}>
      {appearances.map(({name, colors}) => {
        return (
          <ThemeCard
            key={name}
            isSelected={theme === name}
            colors={colors}
            onPress={() => setTheme()}
            disabled={theme === name}
            text={name}
          />
        );
      })}
    </View>
  );
}

type ThemeCardProps = TouchableOpacityProps & {
  isSelected: boolean;
  colors: ThemeColors;
  text: string;
};
const ThemeCard: React.FC<ThemeCardProps> = ({
  isSelected,
  colors,
  text,
  ...props
}: ThemeCardProps) => {
  const borderColor = isSelected ? colors.blue : '#fff';
  return (
    <TouchableOpacity
      style={[
        styles.themeCard,
        {backgroundColor: colors.background, borderColor},
      ]}
      {...props}>
      <View>
        <View
          style={[
            styles.message,
            {
              backgroundColor: colors.secondary,
            },
          ]}
        />
        <View
          style={[
            styles.message,
            styles.messageLeft,
            {
              backgroundColor: colors.blue,
            },
          ]}
        />
        <Text style={[styles.textStyle, {color: colors.text}]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  themeCard: {
    justifyContent: 'space-between',
    flex: 1,
    borderWidth: 3,
    borderRadius: 30,
    padding: 10,
    margin: 10,
  },
  message: {
    width: '70%',
    height: 30,
    marginTop: 10,
    borderRadius: 5,
  },
  messageLeft: {
    alignSelf: 'flex-end',
  },
  textStyle: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
  },
});
