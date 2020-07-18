import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import Card from '../components/Card';
import makeCall from '../components/PhoneCall';
import sendEmail from '../components/Email';
import { MillisToDate } from '../components/HelperFunctions';
import StyledButton from '../components/StyledButton';
import OrderDetails from '../components/OrderDetails';

const OrderDetailsScreen = (props) => {
  const { route } = props;
  const orderID = route.params.orderID;
  const selectedOrder = useSelector((state) =>
    state.orders.orders.find((order) => order.orderID === orderID)
  );

  return (
    <LinearGradient
      colors={[Colors.primaryColor, Colors.lightTeal]}
      style={styles.gradient}
    >
      <OrderDetails
        schedule={selectedOrder.schedule ? selectedOrder.schedule : null}
        product_name={selectedOrder.product_name}
        category_name={selectedOrder.category_name}
        recipient_name={selectedOrder.recipient_name}
        recipient_phone_number={selectedOrder.recipient_phone_number}
        recipient_email={selectedOrder.recipient_email}
        address_string={selectedOrder.address_string}
        address_string_2={selectedOrder.address_string_2}
        delivery_note={selectedOrder.delivery_note}
        sender_name={selectedOrder.sender_name}
        sender_phone_number={selectedOrder.sender_phone_number}
        sender_email={selectedOrder.sender_email}
        time_order_placed={selectedOrder.time_order_placed}
        orderID={selectedOrder.orderID}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  card: {
    flex: 2,
    padding: 10,
    width: 350,
  },
  touchableButton: {
    padding: 5,
    flexDirection: 'row',
  },
  textHeader: {
    paddingBottom: 8,
    fontFamily: 'dm-sans-bold',
    fontSize: 24,
  },
  productContainer: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  product: {
    fontSize: 18,
    color: Colors.primaryColor,
    paddingTop: 10,
    fontFamily: 'dm-sans-regular',
  },
  scheduledTime: {
    fontFamily: 'dm-sans-regular',
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: 10,
  },
  accent: {
    fontFamily: 'dm-sans-bold',
    color: Colors.darkPurp,
  },
  recipientContainer: {
    padding: 5,
    paddingHorizontal: 10,
    alignItems: 'baseline',
  },
  recipientRow: {
    flexDirection: 'row',
    fontFamily: 'dm-sans-regular',
    fontSize: 18,
    paddingBottom: 4,
    color: Colors.darkPurp,
  },
  orderDetailsContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
  },
  button1: {
    backgroundColor: Colors.delayRed,
    marginVertical: 13,
  },
  button2: {
    backgroundColor: Colors.accentColor,
  },
});

export default OrderDetailsScreen;
