// /components/ui/CommonButton.tsx

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface CommonButtonProps {
  onPress: () => void;
  buttonText: string;
  disabled?: boolean; // Add optional disabled prop
  style?: ViewStyle;
}

const CommonButton: React.FC<CommonButtonProps> = ({
  onPress,
  buttonText,
  disabled = false,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress} // Disable onPress if disabled is true
      style={[
        styles.button,
        style,
        disabled && styles.disabledButton, // Apply disabled style if disabled is true
      ]}
      activeOpacity={disabled ? 1 : 0.7} // Prevent click effect if disabled
    >
      <Text style={[styles.buttonText, disabled && styles.disabledText]}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default CommonButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#556B2F',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    marginHorizontal: 30,
    alignItems: 'center',
    marginVertical: 5,
  },
  disabledButton: {
    backgroundColor: '#888888', // Greyed-out color for disabled button
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  disabledText: {
    color: '#CCCCCC', // Lighter grey color for disabled text
  },
});
