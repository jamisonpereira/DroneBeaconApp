import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MapTab: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Map unavailable</Text>
    </View>
  );
};

export default MapTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#F0EBD8',
  },
});
