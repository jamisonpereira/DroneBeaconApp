import React from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import ControlsComponent from '../components/ControlsComponent';
import DataComponent from '../components/DataComponent/DataComponent';

const UnitScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/Serra Logo_WhiteTransparent.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        <View style={styles.leftSide}>
          <ControlsComponent />
        </View>
        <View style={styles.rightSide}>
          <DataComponent />
        </View>
      </View>
    </View>
  );
};

export default UnitScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E3B4E',
  },
  header: {
    alignItems: 'center',
    padding: 0,
    backgroundColor: '#2E3B4E',
  },
  logo: {
    width: 200, // Adjust as needed
    height: 80, // Adjust as needed
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: -20,
    marginBottom: 10,
  },
  leftSide: {
    flex: 1,
    padding: 16,
    paddingLeft: 60, // Extra padding on the left
    paddingRight: 8, // Smaller padding on the right
  },
  rightSide: {
    flex: 1,
    padding: 16,
    paddingRight: 60, // Extra padding on the right
    paddingLeft: 8, // Smaller padding on the left
  },
});
