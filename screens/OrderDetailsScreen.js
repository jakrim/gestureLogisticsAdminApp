import React from 'react';
import { ScrollView, Text, View, Button, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
// import { BallIndicator } from 'react-native-indicators';

import Colors from '../constants/Colors';
import Card from '../components/Card';

const OrderDetailsScreen = props => {
  const { route } = props;
  const orderId = route.params.orderId;
  const selectedOrder = useSelector(state =>
    state.orders.orders.find(order => order.orderId === orderId)
  );
  const dispatch = useDispatch();

  // console.log('HERES ORDER', selectedOrder);

  return (
    <LinearGradient
      colors={[Colors.primaryColor, Colors.lightTeal]}
      style={styles.gradient}
    >
      <Card style={styles.card}>
        <ScrollView>
          {/* <Text style={styles.description}>{selectedProduct.description}</Text> */}
          <View>
            <Text style={styles.recipient}>
              <Text style={{ ...styles.recipient, fontFamily: 'dm-sans-bold' }}>
                Recipient:{' '}
              </Text>
              {selectedOrder.recipient_name}
            </Text>
            <Text>
              {'\n'}
              {selectedOrder.recipient_phone_number}
              {'\n'}
              {selectedOrder.recipient_email}
              {'\n'}
              {selectedOrder.address_string_2} {selectedOrder.address_string}
              {'\n'}
              {selectedOrder.delivery_note}
              {'\n'}
              {selectedOrder.zone}
            </Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
          </View>

          <View style={styles.product}>
            <Text style={styles.price}>{selectedOrder.product_name}</Text>
            <Text style={styles.price}>{selectedOrder.category_name}</Text>
          </View>

          <View style={styles.sender}>
            <Text style={styles.price}>{selectedOrder.sender_name}</Text>
            <Text style={styles.price}>
              {selectedOrder.sender_phone_number}
            </Text>
            <Text style={styles.price}>{selectedOrder.sender_email}</Text>
          </View>

          <Text style={styles.price}>{selectedOrder.orderId}</Text>
          <Text style={styles.price}>{selectedOrder.time_order_placed}</Text>
        </ScrollView>
      </Card>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  card: {
    flex: 1,
    padding: 10,
    width: 350,
    justifyContent: 'center'
  },
  recipient: {
    fontFamily: 'dm-sans-regular',
    fontSize: 18,
    margin: 10,
    color: Colors.primaryColor
  },
  price: {
    fontSize: 18,
    color: Colors.primaryColor,
    // textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'dm-sans-bold'
  },
  description: {
    fontFamily: 'dm-sans-bold',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  }
});

export default OrderDetailsScreen;
