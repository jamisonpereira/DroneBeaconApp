import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';

const OnMissionView: React.FC = () => {
  const droneMgrs = useSelector((state: RootState) => state.location.droneMgrs);
  const droneAltitude = useSelector(
    (state: RootState) => state.location.droneAltitude
  )?.toFixed(1);
  const myMgrs = useSelector((state: RootState) => state.location.myMgrs);
  const distanceMeToDrone = useSelector(
    (state: RootState) => state.location.distanceMeToDrone
  )?.toFixed(1);
  const droneStatus = useSelector(
    (state: RootState) => state.location.droneStatus
  );
  const speed = useSelector(
    (state: RootState) => state.location.speed
  )?.toFixed(1);
  const battery = useSelector((state: RootState) => state.location.battery);

  console.log('altitude: ', droneAltitude);

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <View style={styles.firstRow}>
          <Text style={[styles.label, { fontWeight: 'bold' }]}>
            Mission status:
          </Text>
          <Text style={[styles.data, { fontWeight: 'bold' }]}>On Mission</Text>
        </View>
        <View style={styles.firstRow}>
          <Text style={[styles.label, { fontWeight: 'bold' }]}>
            Drone status:
          </Text>
          <Text style={[styles.data, { fontWeight: 'bold' }]}>
            {droneStatus}
          </Text>
        </View>
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Drone location:</Text>
          <Text style={styles.data}>
            {droneMgrs} (Alt: {droneAltitude})
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>My location:</Text>
          <Text style={styles.data}>{myMgrs}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Distance to drone:</Text>
          {distanceMeToDrone ? (
            <Text style={styles.data}>{distanceMeToDrone} meters</Text>
          ) : (
            <Text style={styles.data}>-</Text>
          )}
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Speed:</Text>
          <Text style={styles.data}>{speed} meters / second</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Drone charge:</Text>
          {battery ? (
            <Text style={styles.data}>{battery}%</Text>
          ) : (
            <Text style={styles.data}>-</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default OnMissionView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 0,
    // borderColor: 'red',
    // borderWidth: 1,
  },
  statusContainer: {
    width: '100%',
    flexDirection: 'column',
    minHeight: 50,
    // justifyContent: 'space-between',
    alignItems: 'flex-start',
    // borderColor: 'green',
    // borderWidth: 1,
  },
  firstRow: {
    flexDirection: 'row',
    marginBottom: 10,
    width: '100%',
    // borderColor: 'green',
    // borderWidth: 1,
  },
  dataContainer: {
    width: '100%',
    alignItems: 'center',
    // borderColor: 'blue',
    // borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    width: '100%',
    // borderColor: 'yellow',
    // borderWidth: 1,
  },
  label: {
    color: '#FFF',
    // fontWeight: 'bold',
    flex: 1,
  },
  data: {
    color: '#FFF',
    flex: 1,
    textAlign: 'left',
  },
});
