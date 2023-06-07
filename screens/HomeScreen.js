import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { AppContext } from '../AppContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const { addItem } = useContext(AppContext);
  const [itemText, setItemText] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  


  const handleAddItem = () => {
    if (itemText.trim() !== '') {
      addItem({ id: Math.random().toString(), text: itemText });
      setItemText('');
      setShowAlert(true);
    }
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleItemList = () => {
    navigation.navigate('ItemList');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de itens</Text>
      <Text style={styles.addTitle}>Adicione um item</Text>
      <TextInput
        style={styles.input}
        value={itemText}
        onChangeText={setItemText}
        placeholder="Digite o nome do item"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddItem}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={handleItemList}>
        <Icon name="list" size={30} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="sign-out" size={30} color="#fff" />
        <Text style={styles.logoutButtonText}>Deslogar</Text>
      </TouchableOpacity>

      <Modal isVisible={showAlert} animationIn="slideInDown" animationOut="slideOutUp">
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Item Adicionado!</Text>
          <TouchableOpacity style={styles.modalButton} onPress={() => setShowAlert(false)}>
            <Text style={styles.modalButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#925692',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Arial',
    color: 'white' 
  },
  addTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white'
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'white',
    backgroundColor: '#02a898',
    borderRadius: 7
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: '#6200EE',
    padding: 20,
    borderRadius: 5,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white'
  },
  modalButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerButton: {
    position: 'absolute',
    bottom: 10,
    right: 10, 
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 10,
    left: 10, 
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    marginLeft: 5,
    color: 'white',
    fontSize: 16,
  },
});

export default HomeScreen;
