import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

const BaseScreen: React.FC = () => {
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
