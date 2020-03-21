import React from 'react';
import { Scrollview, Text, View, Button, StyleSheet } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import Colors from '../constants/Colors';

const OrderDetailsScreen = (props, { route }) => {
  const orderId = route.params.orderId;
  const selectedOrder = useSelector(state =>
    state.orders.orders.find(order => order.orderId === orderId)
  );
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <Text>Order Details Screen</Text>
      <Text>{selectedOrder}</Text>
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
