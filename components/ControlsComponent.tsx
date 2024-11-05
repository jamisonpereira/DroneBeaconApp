// /components/ControlsComponent.tsx

import React, { useState } from 'react';
import { View, Alert, Switch, StyleSheet, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
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

  const [selectedDrone, setSelectedDrone] = useState('Drone 1');
  const [trackDrone, setTrackDrone] = useState(true);
  const [resupplyEnabled, setResupplyEnabled] = useState(true);
  const [webSocketEnabled, setWebSocketEnabled] = useState(false);
  const [sendMessageEnabled, setSendMessageEnabled] = useState(false);

  const [open, setOpen] = useState(false); // Dropdown open state
  const [droneOptions] = useState([
    { label: 'Drone 1', value: 'Drone 1' },
    { label: 'Drone 2', value: 'Drone 2' },
    { label: 'Drone 3', value: 'Drone 3' },
  ]);

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
      sendMessage('test', { message: `Hello from ${selectedDrone}!` });
    }
  };

  const showDisabledAlert = () => {
    Alert.alert('Button Disabled', 'This feature is currently disabled.');
  };

  return (
    <View style={styles.container}>
      {/* Drone Selection Dropdown */}
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Select Drone:</Text>
        <DropDownPicker
          open={open}
          value={selectedDrone}
          items={droneOptions}
          setOpen={setOpen}
          setValue={setSelectedDrone}
          placeholder="Select a drone"
          style={styles.picker}
          dropDownContainerStyle={styles.dropDownContainer}
          textStyle={styles.pickerText}
          containerStyle={styles.pickerContainer}
          arrowIconStyle={{ tintColor: 'white' } as any} // Set arrow color to white
          zIndex={1000} // Ensures dropdown opens on top of other elements
          zIndexInverse={2000} // Higher value for components below
        />
      </View>

      {/* Track Drone Toggle */}
      <View style={styles.trackContainer}>
        <Text style={styles.trackText}>Track Drone:</Text>
        <Switch
          value={trackDrone}
          onValueChange={(value) => setTrackDrone(value)}
          style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
        />
      </View>

      <CommonButton
        onPress={handleResupplyRequest}
        buttonText="Resupply request at my location"
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
    justifyContent: 'flex-start',
    // justifyContent: 'center',
    backgroundColor: '#2E3B4E',
    marginTop: 10,
    paddingLeft: 16,
    paddingRight: 16,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Space between label and dropdown
    marginBottom: 10,
    zIndex: 1000, // Ensures dropdown opens on top of other elements
  },
  dropdownLabel: {
    color: '#FFF',
    fontWeight: 'bold',
    marginRight: 10,
  },
  pickerContainer: {
    width: 150,
  },
  picker: {
    backgroundColor: '#1C2833',
    borderColor: '#888888',
    minHeight: 30, // Height of opened picker box
  },
  dropDownContainer: {
    backgroundColor: '#1C2833',
    borderColor: '#888888',
  },
  pickerText: {
    color: '#FFFF', // Makes the text in the picker white
    fontWeight: 'bold',
  },
  trackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Space between label and dropdown
    marginBottom: 20,
  },
  trackText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginRight: 10,
    // fontSize: 16,
  },
});
