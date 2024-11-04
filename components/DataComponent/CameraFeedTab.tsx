import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

const CameraFeedTab: React.FC = () => {
  // const { videoFeed } = useSelector((state: RootState) => state.webSocket);

  return (
    <View style={styles.container}>
      {/* {videoFeed ? (
        <Image
          source={{ uri: videoFeed }}
          style={styles.videoFeed}
          resizeMode="contain"
        />
      ) : (
        <Text style={styles.text}>No video feed available</Text>
      )} */}
      <Text style={styles.text}>Camera Feed</Text>
    </View>
  );
};

export default CameraFeedTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoFeed: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: '#F0EBD8',
  },
});
