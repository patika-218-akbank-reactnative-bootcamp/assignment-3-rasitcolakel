import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useThemeContext} from '../context/themeContext';
import Feather from 'react-native-vector-icons/Feather';
type Props = {
  items: ListItem[];
};

export type ListItem = {
  icon: ListItemIcon;
  label: string;
  subLabel?: string;
  onPress: () => void;
  // optional icon component such as Feather, MaterialCommunityIcons, etc.
  IconComponent?: any;
};

export type ListItemIcon = {
  name: string;
  color: string;
};

export default function List({items}: Props) {
  const {colors} = useThemeContext();
  return (
    <View style={[styles.container, {backgroundColor: colors.secondary}]}>
      {items.map((item, index) => (
        <ListItem key={index} {...item} />
      ))}
    </View>
  );
}

function ListItem({icon, label, subLabel, onPress, IconComponent}: ListItem) {
  const {colors} = useThemeContext();

  let Icon = IconComponent || Feather;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.itemContainer]}>
        <View style={[styles.itemIcon, {backgroundColor: icon.color}]}>
          <Icon name={icon.name} style={styles.itemIconText} />
        </View>
        <View style={[styles.labelContainer, {borderBottomColor: colors.gray}]}>
          <Text style={[styles.itemLabel, {color: colors.text}]}>{label}</Text>
          <Text style={[styles.itemSubLabel, {color: colors.textSecondary}]}>
            {subLabel}
          </Text>
          <Feather
            name="chevron-right"
            style={[styles.rightIcon, {color: colors.textSecondary}]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '100%',
  },
  itemContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
  itemIcon: {
    margin: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 8,
  },
  itemIconText: {
    color: 'white',
    fontSize: 20,
  },
  labelContainer: {
    marginLeft: 10,
    paddingRight: 10,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    height: '100%',
  },
  itemLabel: {
    flex: 1,
    fontSize: 16,
  },
  itemSubLabel: {
    fontSize: 16,
  },
  rightIcon: {
    fontSize: 25,
  },
});
