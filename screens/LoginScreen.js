import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleLogin = () => {
    // Lógica de autenticação
    if (username === 'usuario' && password === 'senha') {
      Alert.alert(
        'Conectado',
        'Login realizado com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Home');
            },
          },
        ],
        {
          cancelable: false,
          onDismiss: () => {
            navigation.navigate('Home');
          },
        }
      );
    } else {
      Alert.alert(
        'Dados incorretos',
        'Usuário ou senha inválidos. Tente novamente.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordInputFocus = () => {
    setIsTyping(true);
  };

  const handlePasswordInputBlur = () => {
    setIsTyping(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulário</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          value={username}
          onChangeText={setUsername}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            onFocus={handlePasswordInputFocus}
            onBlur={handlePasswordInputBlur}
          />
          {isTyping && (
            <TouchableOpacity style={styles.eyeIcon} onPress={toggleShowPassword}>
              <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>
        <Button title="Login" onPress={handleLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#925692',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 32,
    color: 'white',
  },
  formContainer: {
    padding: 16,
    borderRadius: 8,
  },
  input: {
    marginBottom: 16,
    width: 200,
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    borderRadius: 4,
    backgroundColor: '#02a898',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: 200,
    height: 50,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 4,
    backgroundColor: '#02a898',
  },
  passwordInput: {
    flex: 1,
    padding: 10,
    color: 'white',
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
});

export default LoginScreen;
