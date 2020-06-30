import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
  Dimensions,
} from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import Card from './Card';
import makeCall from './PhoneCall';
import sendEmail from './Email';
import { MillisToDate } from './HelperFunctions';
import StyledButton from './StyledButton';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const OrderDetails = (props) => {
  let TouchableComp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }

  const B = (props) => (
    <Text style={{ fontFamily: 'dm-sans-bold' }}>{props.children}</Text>
  );

  return (
    <Card style={styles.card}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* BEGIN PRODUCT STYLES/VIEW */}
        <View style={styles.productContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <Text style={styles.textHeader}>Delivery Item</Text>
            {props.schedule == null ? (
              <Text
                style={
                  (styles.scheduledTime,
                  { color: Colors.accentColor, fontSize: 18 })
                }
              >
                <B>On Demand</B>
              </Text>
            ) : (
              <Text style={styles.scheduledTime}>
                <B>Scheduled</B>
              </Text>
            )}
          </View>
          <Text style={styles.product}>
            <Text style={styles.accent}>Product: </Text>
            {props.product_name}
          </Text>
          <Text style={styles.product}>
            <Text style={styles.accent}>Category: </Text>
            {props.category_name}
          </Text>
        </View>
        {props.schedule == null ? (
          <></>
        ) : (
          <Text style={styles.scheduledTime}>
            <B>Scheduled For: </B>
            {MillisToDate(props.schedule)}
          </Text>
        )}

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
                color: Colors.primaryColor,
              }}
            >
              {'  '}
              {props.recipient_name}
            </Text>
          </Text>
          <TouchableComp
            onPress={() => makeCall(props.recipient_phone_number)}
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
                {props.recipient_phone_number}
              </Text>
            </Text>
          </TouchableComp>
          <TouchableComp
            onPress={() => {
              sendEmail(
                `${props.recipient_email}`,
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
                {props.recipient_email ? props.recipient_email : 'none'}
              </Text>
            </Text>
          </TouchableComp>
          <Text style={styles.recipientRow}>
            <Ionicons
              name={Platform.OS === 'android' ? 'md-pin' : 'ios-pin'}
              size={24}
              color={Colors.primaryColor}
              style={styles.callTxt}
            />
            <Text
              style={{
                color: Colors.primaryColor,
              }}
            >
              {'   '}
              {props.address_string} ~ {props.address_string_2}
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
                color: Colors.primaryColor,
              }}
            >
              {'  '}
              {props.delivery_note ? props.delivery_note : 'none'}
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
                color: Colors.primaryColor,
              }}
            >
              {'  '}
              {props.sender_name}
            </Text>
          </Text>

          <TouchableComp
            onPress={() => makeCall(props.sender_phone_number)}
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
                {props.sender_phone_number}
              </Text>
            </Text>
          </TouchableComp>
          <TouchableComp
            onPress={() => {
              sendEmail(
                `${props.sender_email}`,
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
                {props.sender_email ? props.sender_email : 'none'}
              </Text>
            </Text>
          </TouchableComp>
        </View>
        {/* Order Details */}
        <Text style={styles.textHeader}>Order Details</Text>

        <View style={styles.orderDetailsContainer}>
          <Text style={styles.orderDetails}>
            <B>Order Placed: </B>
            {MillisToDate(props.time_order_placed)}
          </Text>
          <Text style={styles.orderDetails}>
            <B>Order ID:</B> {props.orderID}
          </Text>
        </View>
        {/* <StyledButton style={styles.button1}>DELAY</StyledButton>
        <StyledButton style={styles.button2}>Connect to G-Runner</StyledButton> */}
      </ScrollView>
    </Card>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  card: {
    flex: 2,
    height: windowHeight,
    padding: 25,
    paddingTop: 20,
    width: windowWidth - 30,
    borderRadius: 10,
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
    color: Colors.primaryColor,
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
  },
  orderDetails: {
    flexDirection: 'row',
    fontFamily: 'dm-sans-regular',
    fontSize: 18,
    paddingBottom: 4,
    color: Colors.primaryColor,
  },
  orderDetailsContainer: {
    paddingTop: 10,
    paddingHorizontal: 2,
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

export default OrderDetails;
