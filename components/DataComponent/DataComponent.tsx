import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import StatusTab from './StatusTab';
import CameraFeedTab from './CameraFeedTab';
import MapTab from './MapTab';

const DataComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Status');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'CameraFeed':
        return <CameraFeedTab />;
      case 'Map':
        return <MapTab />;
      case 'Status':
      default:
        return <StatusTab />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {['Status', 'CameraFeed', 'Map'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab ? styles.activeTab : styles.inactiveTab,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={
                activeTab === tab
                  ? styles.activeTabText
                  : styles.inactiveTabText
              }
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <View style={styles.contentContainer}>{renderTabContent()}</View>
    </View>
  );
};

export default DataComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E3B4E',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1C2833',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#1C2833', // Duller color for inactive tabs
  },
  inactiveTab: {
    backgroundColor: '#3E4C59', // Highlighted color for active tab
  },
  activeTabText: {
    color: '#F0EBD8',
    fontWeight: 'bold',
  },
  inactiveTabText: {
    color: '#888888', // Duller color for inactive tab text
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1C2833', // Duller color for inactive tabs
  },
});
