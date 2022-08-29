import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  TextInput,
} from 'react-native';
type Props<T> = {
  items: T[];
  isOpen: boolean;
  renderItem: ({item}: {item: T}) => React.ReactElement;
  keyExtractor: (item: T) => string;
  search?: (text: string) => void;
};

export default function ModalPicker<T>({
  items,
  isOpen,
  renderItem,
  keyExtractor,
  search,
}: Props<T>) {
  const [searchText, setSearchText] = React.useState<string>('');
  if (!isOpen) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      {search && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchText}
            placeholder="Search"
            placeholderTextColor="#999"
            onChangeText={text => {
              if (search && typeof search === 'function') {
                if (text.length > 2 || text.length === 0) search(text);
                setSearchText(text);
              }
            }}
          />
        </View>
      )}
      <FlatList
        data={items}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        maxToRenderPerBatch={30}
        style={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  list: {
    width: '100%',
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
    position: 'relative',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
