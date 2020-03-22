import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

const GRunnersScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Text>G Runners Screen</Text>
      <Button
        title='Go to Individual GRunner Screen'
        onPress={() => {
          navigation.push('GRunner');
        }}
      />
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

export default GRunnersScreen;
