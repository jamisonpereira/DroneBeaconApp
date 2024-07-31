import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

interface LocationButtonProps {
  onPress: () => void;
}

const LocationButton: React.FC<LocationButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>Request resupply at this location</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#556B2F',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#F0EBD8',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LocationButton;
