// components/DataComponent/StatusTab.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import StandbyView from './StatusViews/Standby';
import OnMissionView from './StatusViews/OnMission';
import ReturnToBaseView from './StatusViews/ReturnToBase';

const StatusTab: React.FC = () => {
  const missionStatus = useSelector(
    (state: RootState) => state.location.missionStatus
  );
  // const status = 'OnMission'; // Hardcoded for testing

  const renderStatusView = () => {
    console.log('StatusTab: missionStatus:', missionStatus);
    switch (missionStatus) {
      case 'Standby':
        return <StandbyView />;
      case 'OnMission':
        return <OnMissionView />;
      case 'ReturnToBase':
        return <ReturnToBaseView />;
      default:
        return <Text style={styles.text}>Unknown Status</Text>;
    }
  };

  return <View style={styles.container}>{renderStatusView()}</View>;
};

export default StatusTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#F0EBD8',
  },
});
