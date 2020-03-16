import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { BallIndicator } from 'react-native-indicators';

const LoadingScreen = props => {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>
        Authenticating with{' '}
        <Text style={{ color: Colors.primaryColor }}>Gesture</Text>
      </Text>
      <BallIndicator color={Colors.primaryColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingVertical: 370,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 30,
    paddingVertical: 30
  }
});

export default LoadingScreen;
