[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=8293902&assignment_repo_type=AssignmentRepo)

### Assignment: [Assignment 3]

## React Native Async Storage Usage
Async storage is used to store data in the device.

### getItem

```js
async function getItem(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // We have data!!
      return value;
    }
  } catch (error) {
    // Error retrieving data
  }
}
```

### setItem

```js
async function setItem(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    // Error saving data
  }
}
```

### removeItem

```js
async function removeItem(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    // Error removing data
  }
}
```
