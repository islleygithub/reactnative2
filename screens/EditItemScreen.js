import React, { useContext, useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import { AppContext } from '../AppContext';

const EditItemScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const { updateItem } = useContext(AppContext);
  const [text, setText] = useState(item.text);

  const handleSave = () => {
    if (text.trim() !== '') {
      updateItem(item.id, text);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={text} onChangeText={setText} />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});

export default EditItemScreen;
