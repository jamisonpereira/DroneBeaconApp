import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

interface CommonButtonProps {
  onPress: () => void;
  buttonText: string;
}

const CommonButton: React.FC<CommonButtonProps> = ({ onPress, buttonText }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{buttonText}</Text>
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

export default CommonButton;
