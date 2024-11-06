import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';

const StandbyView: React.FC = () => {
  // const droneLocation = useSelector((state: RootState) => state.drone.location);
  // const myLocation = useSelector((state: RootState) => state.user.location);
  // const distanceToDrone = useSelector((state: RootState) => state.drone.distanceToUser);
  // const droneCharge = useSelector((state: RootState) => state.drone.charge);

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <View style={styles.firstRow}>
          <Text style={[styles.label, { fontWeight: 'bold' }]}>
            Mission status:
          </Text>
          <Text style={[styles.data, { fontWeight: 'bold' }]}>Standing by</Text>
        </View>
        <View style={styles.firstRow}>
          <Text style={[styles.label, { fontWeight: 'bold' }]}>
            Drone status:
          </Text>
          <Text style={[styles.data, { fontWeight: 'bold' }]}>Landed</Text>
        </View>
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Drone location:</Text>
          <Text style={styles.data}>XXXXXXX</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>My location:</Text>
          <Text style={styles.data}>XXXXXXX</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Distance to drone:</Text>
          <Text style={styles.data}>XXXXXXX meters</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Drone charge:</Text>
          <Text style={styles.data}>XX%</Text>
        </View>
      </View>
    </View>
  );
};

export default StandbyView;

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
    minHeight: 70,
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
