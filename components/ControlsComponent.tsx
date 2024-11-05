// components/ControlsComponent.tsx

import React, { useState } from 'react';
import { View, Alert, Switch, StyleSheet, Text } from 'react-native';
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

  const [trackDrone, setTrackDrone] = useState(true);
  const [resupplyEnabled, setResupplyEnabled] = useState(true);
  const [webSocketEnabled, setWebSocketEnabled] = useState(false);
  const [sendMessageEnabled, setSendMessageEnabled] = useState(false);

  const handleResupplyRequest = async () => {
    if (!resupplyEnabled) {
      showDisabledAlert();
      return;
    }
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
    if (!webSocketEnabled) {
      showDisabledAlert();
      return;
    }
    if (isConnected) {
      Alert.alert('WebSocket', 'WebSocket is already connected.');
    } else {
      initializeWebSocket();
    }
  };

  const handleSendMessage = () => {
    if (!sendMessageEnabled) {
      showDisabledAlert();
      return;
    }
    if (isConnected) {
      sendMessage('test', { message: 'Hello from ControlsComponent!' });
    }
  };

  const showDisabledAlert = () => {
    Alert.alert('Button Disabled', 'This feature is currently disabled.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.trackContainer}>
        <Switch
          value={trackDrone}
          onValueChange={(value) => setTrackDrone(value)}
        />
        <Text style={styles.trackText}>Track Drone</Text>
      </View>

      <CommonButton
        onPress={handleResupplyRequest}
        buttonText="Resupply request at this location"
        disabled={!resupplyEnabled}
      />
      <CommonButton
        onPress={handleWebSocketInit}
        buttonText="Initialize WebSocket"
        disabled={!webSocketEnabled}
      />
      <CommonButton
        onPress={handleSendMessage}
        buttonText="Send WebSocket Test Message"
        disabled={!sendMessageEnabled}
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
  trackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  trackText: {
    color: '#F0EBD8',
    marginLeft: 10,
    fontSize: 16,
  },
});
