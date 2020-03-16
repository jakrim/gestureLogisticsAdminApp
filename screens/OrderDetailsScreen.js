import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const OrderDetailsScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>Order Details Screen</Text>
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

export default OrderDetailsScreen;
