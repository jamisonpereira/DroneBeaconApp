import React, { useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CommonButton from '../components/CommonButton';
import * as Location from 'expo-location';
import * as mgrs from 'mgrs';
import { RootState } from '../state/store';
import { setLocation } from '../state/slices/locationSlice';

const UnitScreen: React.FC = () => {
  const dispatch = useDispatch();
  const {
    latitude,
    longitude,
    mgrs: mgrsCoord,
  } = useSelector((state: RootState) => state.location);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        const mgrsCoordinate = mgrs.forward([longitude, latitude], 5); // 8-digit precision

        dispatch(setLocation({ latitude, longitude, mgrs: mgrsCoordinate }));
      } catch (error) {
        console.error('Error getting location or converting to MGRS:', error);
      }
    })();
  }, [dispatch]);

  const sendCoordinates = () => {
    console.log('Coordinates sent:', { latitude, longitude, mgrsCoord });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Military Drone Beacon</Text>
      <View style={styles.coordinatesContainer}>
        <Text style={styles.coordinatesText}>
          Lat: {latitude} Long: {longitude}
        </Text>
      </View>
      <Text style={styles.mgrsText}>MGRS: {mgrsCoord}</Text>
      <CommonButton
        onPress={sendCoordinates}
        buttonText="Resupply request at this location"
      />
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
});

export default UnitScreen;
