// services/WebSocketService.ts

import Constants from 'expo-constants';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { getToken } from './AuthService'; // Import secure token retrieval function
import { io, Socket } from 'socket.io-client'; // Import Socket.IO client
import { useDispatch } from 'react-redux';
import {
  setDroneLocation,
  setMyLocation,
  setBaseLocation,
  setDistanceMeToDrone,
  setMissionStatus,
  setDroneStatus,
  setSpeed,
  setBattery,
} from '../state/slices/locationSlice';
import * as mgrs from 'mgrs';

function formatMgrs(mgrsString: string): string {
  const regex =
    /^(\d{1,2})([C-X])([A-HJ-NP-Z]{2})(\d{2})(\d{2})(\d{2})(\d{2})$/;
  const match = mgrsString.match(regex);
  if (match) {
    const [
      _,
      zoneNumber,
      zoneLetter,
      squareIdentifier,
      easting1,
      easting2,
      northing1,
      northing2,
    ] = match;
    return `${squareIdentifier} ${easting1}${easting2} ${northing1}${northing2}`;
    // return `${zoneNumber}${zoneLetter} ${squareIdentifier} ${easting1}${easting2} ${northing1}${northing2}`;
  }
  return mgrsString;
}

// WebSocket server URL
const WEBSOCKET_URL =
  Constants.expoConfig?.extra?.NGROK_WSS_URL ||
  Constants.manifest?.extra?.NGROK_WSS_URL;

const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const [videoFeed, setVideoFeed] = useState<string | null>(null);
  const dispatch = useDispatch();

  // Landing request callback (UI can register this to handle landing requests)
  const landingRequestCallbackRef = useRef<(data: any) => void>();

  // Initialize WebSocket connection
  const initializeWebSocket = useCallback(async () => {
    const token = await getToken();
    if (!token) {
      console.error('Token not available, cannot connect to WebSocket');
      return;
    }

    console.log(
      'Connecting to WebSocket with Socket.IO:',
      WEBSOCKET_URL + '?token=' + token
    );

    // Use Socket.IO to connect to the server with the token as a query parameter
    socketRef.current = io(WEBSOCKET_URL, {
      query: { token },
      transports: ['websocket'], // Forces WebSocket protocol
    });

    socketRef.current.on('connect', () => {
      console.log('Socket.IO connection opened');
      setIsConnected(true);
    });

    socketRef.current.on('message', (data) => {
      console.log('Received message from server:', data);
    });

    socketRef.current.on('disconnect', () => {
      console.log('Socket.IO connection closed');
      setIsConnected(false);
    });

    socketRef.current.on('error', (error) => {
      console.error('Socket.IO error:', error);
      setIsConnected(false);
    });

    // Add event listeners for responses from the server
    socketRef.current.on('test_response', (data) => {
      console.log('Test Response:', data);
    });

    // Add event listeners for responses from the server
    socketRef.current.on('landing_request', (data) => {
      console.log('Landing Request:', data);
      if (landingRequestCallbackRef.current) {
        landingRequestCallbackRef.current(data);
      }
    });

    socketRef.current.on('drone_coordinates', (data) => {
      console.log('Drone Coordinates:', data);
      const {
        lat: droneLatitude,
        long: droneLongitude,
        alt: droneAltitude,
      } = data;
      const droneMgrs = formatMgrs(
        mgrs.forward([droneLongitude, droneLatitude], 4)
      );
      console.log('Drone MGRS:', droneMgrs);

      dispatch(
        setDroneLocation({
          droneLatitude,
          droneLongitude,
          droneAltitude,
          droneMgrs,
        })
      );
    });

    socketRef.current.on('my_coordinates', (data) => {
      console.log('My Coordinates:', data);
      const { lat: myLatitude, long: myLongitude, alt: myAltitude } = data;
      const myMgrs = formatMgrs(mgrs.forward([myLongitude, myLatitude], 4));
      dispatch(
        setMyLocation({
          myLatitude,
          myLongitude,
          myAltitude,
          myMgrs,
        })
      );
    });

    socketRef.current.on('base_coordinates', (data) => {
      console.log('Base Coordinates:', data);
      const {
        lat: baseLatitude,
        long: baseLongitude,
        alt: baseAltitude,
      } = data;
      const baseMgrs = formatMgrs(
        mgrs.forward([baseLongitude, baseLatitude], 4)
      );
      dispatch(
        setBaseLocation({
          baseLatitude,
          baseLongitude,
          baseAltitude,
          baseMgrs,
        })
      );
    });

    socketRef.current.on('distance_me_to_drone', (data) => {
      console.log('Distance Me to Drone:', data);
      const distanceMeToDrone = data;
      dispatch(setDistanceMeToDrone({ distanceMeToDrone }));
    });

    socketRef.current.on('mission_status', (data) => {
      console.log('Mission Status Response:', data);
      const { status: missionStatus } = data;
      dispatch(setMissionStatus({ missionStatus }));
    });

    socketRef.current.on('drone_status', (data) => {
      console.log('Drone Status Response:', data);
      const { status: droneStatus } = data;
      dispatch(setDroneStatus({ droneStatus }));
    });

    socketRef.current.on('speed', (data) => {
      console.log('Speed response:', data);
      dispatch(setSpeed({ speed: data }));
    });

    socketRef.current.on('battery', (data) => {
      console.log('Battery response:', data);
      dispatch(setBattery({ battery: data }));
    });

    socketRef.current.on('return_to_base_response', (data) => {
      console.log('Return to Base Response:', data);
    });

    socketRef.current.on('video_feed', (data) => {
      if (data) {
        // console.log('Video Feed Response:', data);
        setVideoFeed(`data:image/jpeg;base64,${data}`);
      } else {
        console.log('Video Feed Response: No data received');
      }
    });
  }, []);

  // Function to send different message types via WebSocket
  const sendMessage = (messageType: string, payload: Record<string, any>) => {
    if (socketRef.current && isConnected) {
      const message = JSON.stringify({
        type: messageType,
        ...payload,
      });
      socketRef.current.emit('message', message);
      console.log('Message sent:', message);
    } else {
      Alert.alert('Error', 'WebSocket is not connected.');
    }
  };

  // Function to register a callback for landing requests
  const onLandingRequest = (callback: (data: any) => void) => {
    landingRequestCallbackRef.current = callback;
  };

  // Cleanup WebSocket connection on component unmount
  useEffect(() => {
    initializeWebSocket();
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return {
    initializeWebSocket, // Expose initializeWebSocket function
    sendMessage, // Expose sendMessage function
    isConnected, // Expose connection status
    videoFeed, // Expose video feed data
    onLandingRequest, // Expose landing request callback registration
  };
};

export default useWebSocket;
