import Constants from 'expo-constants';
import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { getToken } from './AuthService'; // Import secure token retrieval function

// WebSocket server URL
const WEBSOCKET_URL =
  Constants.expoConfig?.extra?.NGROK_WSS_URL ||
  Constants.manifest?.extra?.NGROK_WSS_URL;

const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const webSocketRef = useRef<WebSocket | null>(null);

  // Initialize WebSocket connection
  const initializeWebSocket = async () => {
    const token = await getToken();
    if (!token) {
      console.error('Token not available, cannot connect to WebSocket');
      return;
    }

    webSocketRef.current = new WebSocket(`${WEBSOCKET_URL}?token=${token}`);

    webSocketRef.current.onopen = () => {
      console.log('WebSocket connection opened');
      setIsConnected(true);
    };

    webSocketRef.current.onmessage = (event) => {
      console.log('Received message from server:', event.data);
    };

    webSocketRef.current.onclose = () => {
      console.log('WebSocket connection closed');
      setIsConnected(false);
      attemptReconnect();
    };

    webSocketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
      attemptReconnect();
    };
  };

  // Function to attempt reconnecting after a delay
  const attemptReconnect = () => {
    setTimeout(() => {
      console.log('Attempting to reconnect...');
      initializeWebSocket();
    }, 5000); // Retry every 5 seconds
  };

  // Function to send messages via WebSocket
  const sendMessage = (message: string) => {
    if (webSocketRef.current && isConnected) {
      webSocketRef.current.send(message);
      console.log('Message sent:', message);
    } else {
      Alert.alert('Error', 'WebSocket is not connected.');
    }
  };

  // Cleanup WebSocket connection on component unmount
  useEffect(() => {
    initializeWebSocket();
    return () => {
      if (webSocketRef.current) {
        webSocketRef.current.close();
      }
    };
  }, []);

  return {
    sendMessage, // Expose sendMessage function
    isConnected, // Expose connection status
  };
};

export default useWebSocket;
