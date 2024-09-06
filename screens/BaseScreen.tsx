import React, { useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../navigation/AppStackNavigator'; // Import the type for navigation

type BaseScreenNavigationProp = StackNavigationProp<AppStackParamList, 'Login'>;

const BaseScreen: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const navigation = useNavigation<BaseScreenNavigationProp>(); // Type the navigation

  useEffect(() => {
    // If user is not authenticated, navigate to LoginScreen
    if (!isAuthenticated) {
      navigation.navigate('Login');
    }
  }, [isAuthenticated, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Base Screen</Text>
      <Text style={styles.text}>
        This is a placeholder for the Base screen.
      </Text>
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
  text: {
    color: '#F0EBD8',
    textAlign: 'center',
  },
});

export default BaseScreen;
