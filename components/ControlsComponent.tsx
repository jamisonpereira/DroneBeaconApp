import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CommonButton from './ui/CommonButton';
import { RootState } from '../state/store';
import { setLocation } from '../state/slices/locationSlice';
import { requestResupply } from '../services/ApiService';
import useWebSocket from '../services/WebSocketService';

const ControlsComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { latitude, longitude, altitude } = useSelector(
    (state: RootState) => state.location
  );
  const { initializeWebSocket, sendMessage, isConnected } = useWebSocket();

  const handleResupplyRequest = async () => {
    try {
      const response = await requestResupply(
        latitude,
        longitude,
        altitude,
        ['item1', 'item2'],
        'normal'
      );
      Alert.alert(
        'Resupply Request',
        'Request sent successfully! Message: ' + response.message
      );
    } catch (error) {
      console.error('Failed to send resupply request:', error);
      Alert.alert(
        'Resupply Request',
        'Failed to send request. Please try again.'
      );
    }
  };

  const handleWebSocketInit = () => {
    if (isConnected) {
      Alert.alert('WebSocket', 'WebSocket is already connected.');
    } else {
      initializeWebSocket();
    }
  };

  const handleSendMessage = () => {
    if (isConnected) {
      sendMessage('test', { message: 'Hello from ControlsComponent!' });
    }
  };

  return (
    <View style={styles.container}>
      <CommonButton
        onPress={handleResupplyRequest}
        buttonText="Resupply request at this location"
      />
      <CommonButton
        onPress={handleWebSocketInit}
        buttonText="Initialize WebSocket"
      />
      <CommonButton
        onPress={handleSendMessage}
        buttonText="Send WebSocket Test Message"
      />
    </View>
  );
};

export default ControlsComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#2E3B4E',
    paddingLeft: 16,
    paddingRight: 16,
  },
});
