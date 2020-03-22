import React from 'react';
import {
  ScrollView,
  Text,
  View,
  Button,
  TouchableOpacity,
  Linking,
  Platform,
  StyleSheet
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import Card from '../components/Card';
import makeCall from '../components/PhoneCall';

const OrderDetailsScreen = props => {
  const { route } = props;
  const orderId = route.params.orderId;
  const selectedOrder = useSelector(state =>
    state.orders.orders.find(order => order.orderId === orderId)
  );
  const dispatch = useDispatch();

  // console.log('HERES ORDER', selectedOrder);

  const makeEmail = () => {
    let recipientEmail = selectedOrder.recipient_email;

    if (Platform.OS === 'android') {
      recipientPhoneNumber = `tel:${recipientPhoneNumber}`;
    } else {
      recipientPhoneNumber = `telprompt:${recipientPhoneNumber}`;
    }

    Linking.openURL(recipientPhoneNumber).then(supported => {
      if (supported) {
        return Linking.openURL(url).catch(() => null);
      }
    });
  };

  return (
    <LinearGradient
      colors={[Colors.primaryColor, Colors.lightTeal]}
      style={styles.gradient}
    >
      <Card style={styles.card}>
        <ScrollView>
          {/* <Text style={styles.description}>{selectedProduct.description}</Text> */}
          <View style={styles.recipientContainer}>
            <Text style={styles.recipient}>
              <Text style={{ ...styles.recipient, fontFamily: 'dm-sans-bold' }}>
                To:{' '}
              </Text>
              {selectedOrder.recipient_name}
            </Text>
          </View>
          <View style={styles.recipientContainer}>
            <TouchableOpacity
              onPress={() => makeCall(selectedOrder.recipient_phone_number)}
              activeOpacity={0.7}
              style={styles.touchableButton}
            >
              <Ionicons
                name={Platform.OS === 'android' ? 'md-call' : 'ios-call'}
                size={20}
                color='#0644AD'
                style={styles.callTxt}
              />
              <Text style={{ color: '#0644AD', fontSize: 18 }}>
                {'  '}
                {selectedOrder.recipient_phone_number}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={makeCall}
              activeOpacity={0.7}
              style={styles.touchableButton}
            >
              <Ionicons
                name='ios-call'
                size={20}
                color='#0644AD'
                style={styles.callTxt}
              />
              <Text style={{ color: '#0644AD', fontSize: 18 }}>
                {'  '}
                {selectedOrder.recipient_email}
              </Text>
            </TouchableOpacity>
            <Text style={styles.recipient}>{'\n'}</Text>
          </View>
          <View>
            <Text>
              {selectedOrder.address_string_2} {selectedOrder.address_string}
            </Text>

            <Text>
              {selectedOrder.delivery_note}
              {'\n'}
              {selectedOrder.zone}
            </Text>
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
  recipientContainer: {
    margin: 10,
    alignItems: 'center'
  },
  recipient: {
    fontFamily: 'dm-sans-regular',
    fontSize: 18,
    color: Colors.primaryColor
  },
  touchableButton: {
    width: '80%',
    padding: 10,
    flexDirection: 'row'
    // backgroundColor: '#9c27b0'
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
