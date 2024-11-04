import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatusTab: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Status Information</Text>
    </View>
  );
};

export default StatusTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#F0EBD8',
    fontSize: 18,
  },
});
