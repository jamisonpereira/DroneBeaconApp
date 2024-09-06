// File: screens/LoginScreen.tsx

import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  Alert,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { login } from '../services/AuthService'; // Import login function

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }

    try {
      await login(username, password);
      Alert.alert('Success', 'Logged in successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to login. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Military Drone Beacon</Text>
      <TextInput
        placeholder="Username"
        placeholderTextColor="#F0EBD8"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#F0EBD8"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Login"
          onPress={handleLogin}
          color="#F0EBD8"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E3B4E',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    color: '#F0EBD8',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#F0EBD8',
    borderRadius: 5,
    marginBottom: 20,
    color: '#F0EBD8',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
});

export default LoginScreen;
