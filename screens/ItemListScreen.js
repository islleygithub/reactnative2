import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, Animated } from 'react-native';
import { AppContext } from '../AppContext';
import { Ionicons } from '@expo/vector-icons';

const Item = ({ item, onPressUpdate, onPressDelete }) => {
  const [slide] = useState(new Animated.Value(1));

  const handleDelete = () => {
    Animated.timing(slide, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onPressDelete(item.id);
    });
  };

  return (
    <Animated.View
      style={[
        styles.itemContainer,
        {
          transform: [{ translateX: slide.interpolate({ inputRange: [0, 1], outputRange: [-1000, 0] }) }],
          opacity: slide,
        },
      ]}
    >
      <TouchableOpacity onPress={onPressUpdate}>
        <Text style={styles.itemText}>{item.text}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Ionicons name="trash-outline" size={20} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const ItemList = ({ navigation }) => {
  const { items, updateItem, deleteItem } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [updatedText, setUpdatedText] = useState('');

  const handleUpdateItem = () => {
    if (selectedItem && updatedText.trim() !== '') {
      updateItem(selectedItem.id, updatedText);
      setModalVisible(false);
      setUpdatedText('');
      setSelectedItem(null);
    }
  };

  const handleDeleteItem = (itemId) => {
    deleteItem(itemId);
    setModalVisible(false);
    setSelectedItem(null);
  };

  const renderItem = ({ item }) => (
    <Item
      item={item}
      onPressUpdate={() => {
        setSelectedItem(item);
        setModalVisible(true);
      }}
      onPressDelete={handleDeleteItem}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Itens</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Item</Text>
            <TextInput
              style={styles.modalInput}
              value={updatedText}
              onChangeText={setUpdatedText}
              placeholder="Digite o novo nome do item"
            />
            <TouchableOpacity style={[styles.modalButton, styles.updateButton]} onPress={handleUpdateItem}>
              <Text style={styles.modalButtonText}>Atualizar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.footerContainer} onPress={() => navigation.navigate('Home')}>
        <Ionicons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#925692',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Arial',
    color: 'white',
  },
  listContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  itemContainer: {
    backgroundColor: '#02a898',
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 15,
    elevation: 2,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#6200EE',
    paddingHorizontal: 20,
    paddingVertical: 30,
    width: '80%',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  modalInput: {
    width: '100%',
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'white',
    backgroundColor: '#02a898',
    borderRadius: 7,
  },
  modalButton: {
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  updateButton: {
    backgroundColor: '#FF8C00',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 50,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    padding: 5,
    borderRadius: 5,
  },
});

export default ItemList;
