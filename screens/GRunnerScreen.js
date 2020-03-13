import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const GRunnerScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>ONLY ONE G Runner Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default GRunnerScreen;
