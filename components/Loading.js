import { View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const Loading = ({ size }) => {
  return (
    <View style={{ height: size, aspectRatio: 1 }}>
      <LottieView
        style={{ flex: 1 }}
        source={require('../assets/images/loading.json')}  // Ensure the path is correct
        autoPlay
        loop
      />
    </View>
  );
};

export default Loading;
