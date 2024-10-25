// services/WebSocketService.ts

import Constants from 'expo-constants';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { getToken } from './AuthService'; // Import secure token retrieval function
import { io, Socket } from 'socket.io-client'; // Import Socket.IO client

// WebSocket server URL
const WEBSOCKET_URL =
  Constants.expoConfig?.extra?.NGROK_WSS_URL ||
  Constants.manifest?.extra?.NGROK_WSS_URL;

const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

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

    socketRef.current.on('landing_permission_response', (data) => {
      console.log('Landing Permission Response:', data);
    });

    socketRef.current.on('location_data_response', (data) => {
      console.log('Location Data Response:', data);
    });

    socketRef.current.on('return_to_base_response', (data) => {
      console.log('Return to Base Response:', data);
    });

    socketRef.current.on('video_feed_response', (data) => {
      console.log('Video Feed Response:', data);
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
  };
};

export default useWebSocket;
