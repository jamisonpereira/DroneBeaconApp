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
import { useDispatch } from 'react-redux'; // Import useDispatch
import { loginSuccess } from '../state/slices/authSlice'; // Import the loginSuccess action
import CommonButton from '../components/ui/CommonButton';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }

    try {
      // Attempt login
      const success = await login(username, password);

      if (success) {
        Alert.alert('Success', 'Logged in successfully!');
        dispatch(loginSuccess());
      } else {
        Alert.alert('Error', 'Invalid username or password. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to login. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Serra Technologies</Text>
      <TextInput
        placeholder="Username"
        placeholderTextColor="#F0EBD8"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none" // Prevent capitalization
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#F0EBD8"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        autoCapitalize="none" // Optional, in case you don't want to capitalize passwords
      />
      <View style={styles.buttonContainer}>
        {/* <Button
          title="Login"
          onPress={handleLogin}
          color="#F0EBD8"
        /> */}
        <CommonButton
          onPress={handleLogin}
          buttonText="Login"
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
