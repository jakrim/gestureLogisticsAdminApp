import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const HomeScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>HomeScreen</Text>
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

export default HomeScreen;
