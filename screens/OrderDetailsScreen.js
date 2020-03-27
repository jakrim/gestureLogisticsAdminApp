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
import sendEmail from '../components/Email';
import MillisToDate from '../components/MillisToDate';
import ButtonStyle from '../components/ButtonStyle';

const OrderDetailsScreen = props => {
  const { route } = props;
  const orderId = route.params.orderId;
  const selectedOrder = useSelector(state =>
    state.orders.orders.find(order => order.orderId === orderId)
  );

  return (
    <LinearGradient
      colors={[Colors.primaryColor, Colors.lightTeal]}
      style={styles.gradient}
    >
      <Card style={styles.card}>
        <ScrollView>
          {/* BEGIN PRODUCT STYLES/VIEW */}
          <View style={styles.productContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'baseline'
              }}
            >
              <Text style={styles.textHeader}>Delivery Item</Text>
              {selectedOrder.schedule ? (
                <Text style={styles.scheduledTime}>Scheduled</Text>
              ) : (
                <Text
                  style={(styles.scheduledTime, { color: Colors.accentColor })}
                >
                  On Demand
                </Text>
              )}
            </View>
            <Text style={styles.product}>
              <Text style={styles.accent}>Product: </Text>
              {selectedOrder.product_name}
            </Text>
            <Text style={styles.product}>
              <Text style={styles.accent}>Category: </Text>
              {selectedOrder.category_name}
            </Text>
          </View>
          {selectedOrder.schedule ? (
            <Text style={styles.scheduledTime}>
              Scheduled For: {MillisToDate(selectedOrder.schedule)}
            </Text>
          ) : null}

          {/* BEGIN RECIPIENT STYLES/VIEW */}
          <Text style={styles.textHeader}>Delivering To</Text>
          <View style={styles.recipientContainer}>
            <Text style={styles.recipientRow}>
              <Ionicons
                name={Platform.OS === 'android' ? 'md-person' : 'ios-person'}
                size={24}
                color={Colors.primaryColor}
                style={styles.callTxt}
              />
              <Text
                style={{
                  color: Colors.primaryColor
                }}
              >
                {'  '}
                {selectedOrder.recipient_name}
              </Text>
            </Text>
            <TouchableOpacity
              onPress={() => makeCall(selectedOrder.recipient_phone_number)}
              activeOpacity={0.7}
            >
              <Text style={styles.recipientRow}>
                <Ionicons
                  name={Platform.OS === 'android' ? 'md-call' : 'ios-call'}
                  size={24}
                  color={Colors.primaryColor}
                  style={styles.callTxt}
                />
                <Text style={{ color: '#0644AD', fontSize: 18 }}>
                  {'  '}
                  {selectedOrder.recipient_phone_number}
                </Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                sendEmail(
                  `${selectedOrder.recipient_email}`,
                  `Here's an example SUBJECT`,
                  `Hey this is Eugene with Gesture, your order is going to be a little bit delayed. Our sincere apologies.`,
                  { cc: 'daniel@yourgesture.com' }
                ).then(() => {
                  console.log('Your email was successfully sent!');
                });
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.recipientRow}>
                <Ionicons
                  name={Platform.OS === 'android' ? 'md-mail' : 'ios-mail'}
                  size={24}
                  color={Colors.primaryColor}
                  style={styles.callTxt}
                />
                <Text style={{ color: '#0644AD', fontSize: 18 }}>
                  {'  '}
                  {selectedOrder.recipient_email}
                </Text>
              </Text>
            </TouchableOpacity>
            <Text style={styles.recipientRow}>
              <Ionicons
                name={Platform.OS === 'android' ? 'md-pin' : 'ios-pin'}
                size={24}
                color={Colors.primaryColor}
                style={styles.callTxt}
              />
              <Text
                style={{
                  color: Colors.primaryColor
                }}
              >
                {'   '}
                {selectedOrder.address_string} ~{' '}
                {selectedOrder.address_string_2}
              </Text>
            </Text>

            <Text style={styles.recipientRow}>
              <Ionicons
                name={Platform.OS === 'android' ? 'md-locate' : 'ios-locate'}
                size={22}
                color={Colors.primaryColor}
                style={styles.callTxt}
              />
              <Text
                style={{
                  color: Colors.primaryColor
                }}
              >
                {'  '}
                {selectedOrder.delivery_note}
              </Text>
            </Text>
          </View>

          {/* BEGIN SENDER STYLES/VIEW */}
          <Text style={styles.textHeader}>Sender</Text>
          <View style={styles.recipientContainer}>
            <Text style={styles.recipientRow}>
              <Ionicons
                name={Platform.OS === 'android' ? 'md-person' : 'ios-person'}
                size={24}
                color={Colors.primaryColor}
                style={styles.callTxt}
              />
              <Text
                style={{
                  color: Colors.primaryColor
                }}
              >
                {'  '}
                {selectedOrder.sender_name}
              </Text>
            </Text>

            <TouchableOpacity
              onPress={() => makeCall(selectedOrder.recipient_phone_number)}
              activeOpacity={0.7}
            >
              <Text style={styles.recipientRow}>
                <Ionicons
                  name={Platform.OS === 'android' ? 'md-call' : 'ios-call'}
                  size={24}
                  color={Colors.primaryColor}
                  style={styles.callTxt}
                />
                <Text style={{ color: '#0644AD', fontSize: 18 }}>
                  {'  '}
                  {selectedOrder.sender_phone_number}
                </Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                sendEmail(
                  `${selectedOrder.recipient_email}`,
                  `Here's an example SUBJECT`,
                  `Hey this is Eugene with Gesture, your order is going to be a little bit delayed. Our sincere apologies.`,
                  { cc: 'daniel@yourgesture.com' }
                ).then(() => {
                  console.log('Your email was successfully sent!');
                });
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.recipientRow}>
                <Ionicons
                  name={Platform.OS === 'android' ? 'md-mail' : 'ios-mail'}
                  size={24}
                  color={Colors.primaryColor}
                  style={styles.callTxt}
                />
                <Text style={{ color: '#0644AD', fontSize: 18 }}>
                  {'  '}
                  {selectedOrder.sender_email}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
          {/* Order Details */}
          <Text style={styles.textHeader}>Order Details</Text>

          <View style={styles.orderDetailsContainer}>
            <Text style={styles.recipientRow}>
              Order ID: {selectedOrder.orderId}
            </Text>
            <Text style={styles.recipientRow}>
              Order Placed: {MillisToDate(selectedOrder.time_order_placed)}
            </Text>
          </View>
          <ButtonStyle style={styles.button}>DELAY</ButtonStyle>
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
    flex: 2,
    padding: 10,
    width: 350
  },
  touchableButton: {
    padding: 5,
    flexDirection: 'row'
  },
  textHeader: {
    paddingBottom: 8,
    fontFamily: 'dm-sans-bold',
    fontSize: 24
  },
  productContainer: {
    paddingTop: 10,
    paddingBottom: 20
  },
  product: {
    fontSize: 18,
    color: Colors.primaryColor,
    paddingTop: 10,
    fontFamily: 'dm-sans-regular'
  },
  scheduledTime: {
    fontFamily: 'dm-sans-bold',
    color: 'red',
    fontSize: 16,
    textAlign: 'center'
  },
  accent: {
    fontFamily: 'dm-sans-bold',
    color: Colors.darkPurp
  },
  recipientContainer: {
    padding: 5,
    paddingHorizontal: 10,
    alignItems: 'baseline'
  },
  recipient: {
    fontFamily: 'dm-sans-regular',
    fontSize: 18,
    color: Colors.primaryColor
  },
  recipientRow: {
    flexDirection: 'row',
    fontFamily: 'dm-sans-regular',
    fontSize: 18,
    paddingBottom: 4,
    color: Colors.darkPurp
  },
  senderContainer: {
    paddingTop: 20,
    margin: 10
  },
  sender: {
    fontFamily: 'dm-sans-regular',
    fontSize: 18,
    color: Colors.primaryColor
  },
  description: {
    fontFamily: 'dm-sans-bold',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  },
  orderDetailsContainer: {
    padding: 10,
    alignItems: 'flex-start'
  },
  orderDetails: {
    fontFamily: 'dm-sans-regular',
    fontSize: 18,
    color: Colors.primaryColor
  },
  button: {
    backgroundColor: Colors.delayRed
  }
});

export default OrderDetailsScreen;
