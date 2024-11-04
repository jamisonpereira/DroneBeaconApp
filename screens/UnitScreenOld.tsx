import React, { useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, Alert, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CommonButton from '../components/ui/CommonButton';
import * as Location from 'expo-location';
import * as mgrs from 'mgrs';
import { RootState } from '../state/store';
import { setLocation } from '../state/slices/locationSlice';
import { requestResupply } from '../services/ApiService'; // Import the API service function
import { useNavigation } from '@react-navigation/native'; // Import navigation
import type { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../navigation/AppStackNavigator'; // Import the type for navigation
import useWebSocket from '../services/WebSocketService';

type UnitScreenNavigationProp = StackNavigationProp<AppStackParamList, 'Login'>;

const UnitScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<UnitScreenNavigationProp>(); // Type the navigation

  const {
    latitude,
    longitude,
    altitude,
    mgrs: mgrsCoord,
  } = useSelector((state: RootState) => state.location);

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  ); // Check authentication state

  const { initializeWebSocket, sendMessage, isConnected, videoFeed } =
    useWebSocket(); // Use the WebSocket hook

  useEffect(() => {
    // If user is not authenticated, navigate to LoginScreen
    if (!isAuthenticated) {
      navigation.navigate('Login');
      return;
    }

    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        const altitude = location.coords?.altitude || 0; // TODO: figure out altitude
        const mgrsCoordinate = mgrs.forward([longitude, latitude], 5); // 8-digit precision

        dispatch(
          setLocation({ latitude, longitude, altitude, mgrs: mgrsCoordinate })
        );
      } catch (error) {
        console.error('Error getting location or converting to MGRS:', error);
      }
    })();
  }, [dispatch, isAuthenticated, navigation]);

  const handleResupplyRequest = async () => {
    try {
      console.log('Sending resupply request with location:', {
        latitude,
        longitude,
      });

      // Call the API service to make the resupply request
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
      // sendMessage('test', { message: 'Initializing WebSocket connection...' });
    }
  };

  const handleSendMessage = () => {
    if (isConnected) {
      sendMessage('test', { message: 'Hello from UnitScreen!' });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Serra Tech</Text>
      <View style={styles.coordinatesContainer}>
        <Text style={styles.coordinatesText}>
          Lat: {latitude?.toFixed(6)} Long: {longitude?.toFixed(6)}
        </Text>
      </View>
      <Text style={styles.mgrsText}>MGRS: {mgrsCoord}</Text>
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
      {videoFeed && (
        <Image
          source={{ uri: videoFeed }}
          style={styles.videoFeed}
          resizeMode="contain"
        />
      )}
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
  coordinatesContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  coordinatesText: {
    color: '#F0EBD8',
    marginRight: 10,
  },
  mgrsText: {
    color: '#F0EBD8',
    marginBottom: 20,
    textAlign: 'center',
  },
  videoFeed: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
});

export default UnitScreen;
