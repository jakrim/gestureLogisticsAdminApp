import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Text>Home Screen</Text>
      <Button
        title='Go to Order Details Screen'
        onPress={() => {
          navigation.push('OrderDetailsScreen');
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

export default HomeScreen;
