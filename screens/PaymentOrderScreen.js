import React, { useState, useEffect, useCallback } from 'react';
import {
  ScrollView,
  Text,
  View,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BallIndicator } from 'react-native-indicators';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import * as orderActions from '../store/actions/orders';
import Colors from '../constants/Colors';
import Card from '../components/Card';
import makeCall from '../components/PhoneCall';
import sendEmail from '../components/Email';
import { MillisToDate } from '../components/HelperFunctions';
import StyledButton from '../components/StyledButton';
import ErrorBoundary, { throwError } from '../components/ErrorBoundary';

const PaymentOrderScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const { navigation, route } = props;

  let TouchableComp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }

  const order = useSelector((state) => state.orders.order);
  const orderId = route.params.orderId;

  const loadOrder = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(orderActions.fetchOrder(orderId));
    } catch (err) {
      setError('Error in Payment Order Screen', err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    let mount = true;
    if (mount) {
      navigation.addListener('focus', loadOrder);
    }

    return () => (mount = false);
  }, [navigation, loadOrder]);

  useEffect(() => {
    let effect = true;
    if (effect) {
      setIsLoading(true);
      loadOrder()
        .then(() => {
          setIsLoading(false);
        })
        .catch((e) => {
          throwError(new Error('Asynchronous error'));
        });
    }
    return () => (effect = false);
  }, [dispatch, loadOrder]);

  if (error) {
    return (
      <ErrorBoundary>
        <LinearGradient
          colors={[Colors.primaryColor, Colors.lightTeal]}
          style={styles.gradient}
        >
          <View style={styles.centered}>
            <Text
              style={{
                fontSize: 20,
                color: Colors.darkPurp,
              }}
            >
              An error occurred!
            </Text>
            {!isLoading ? (
              <Button
                title='Try again'
                onPress={loadOrder}
                color={Colors.LightColorText}
              />
            ) : (
              <BallIndicator color={Colors.LightColorText} />
            )}
          </View>
        </LinearGradient>
      </ErrorBoundary>
    );
  }

  if (isLoading) {
    return (
      <ErrorBoundary>
        <LinearGradient
          colors={[Colors.primaryColor, Colors.lightTeal]}
          style={styles.gradient}
        >
          <View style={styles.centered}>
            <BallIndicator color={Colors.backgroundFeed} />
          </View>
        </LinearGradient>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
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
                  alignItems: 'baseline',
                }}
              >
                <Text style={styles.textHeader}>Delivery Item</Text>
                {!!order.schedule ? (
                  <Text style={styles.scheduledTime}>Scheduled</Text>
                ) : (
                  <Text
                    style={
                      (styles.scheduledTime, { color: Colors.accentColor })
                    }
                  >
                    On Demand
                  </Text>
                )}
              </View>
              <Text style={styles.product}>
                <Text style={styles.accent}>Product: </Text>
                {order.product_name}
              </Text>
              <Text style={styles.product}>
                <Text style={styles.accent}>Category: </Text>
                {order.category_name}
              </Text>
            </View>
            {!!order.schedule ? (
              <Text style={styles.scheduledTime}>
                Scheduled For: {MillisToDate(order.schedule)}
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
                    color: Colors.primaryColor,
                  }}
                >
                  {'  '}
                  {order.recipient_name}
                </Text>
              </Text>
              <TouchableComp
                onPress={() => makeCall(order.recipient_phone_number)}
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
                    {order.recipient_phone_number}
                  </Text>
                </Text>
              </TouchableComp>
              <TouchableComp
                onPress={() => {
                  sendEmail(
                    `${order.recipient_email}`,
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
                    {order.recipient_email}
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
                  {order.address_string} ~ {order.address_string_2}
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
                  {order.delivery_note}
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
                  {order.sender_name}
                </Text>
              </Text>

              <TouchableComp
                onPress={() => makeCall(order.recipient_phone_number)}
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
                    {order.sender_phone_number}
                  </Text>
                </Text>
              </TouchableComp>
              <TouchableComp
                onPress={() => {
                  sendEmail(
                    `${order.recipient_email}`,
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
                    {order.sender_email}
                  </Text>
                </Text>
              </TouchableComp>
            </View>
            {/* Order Details */}
            <Text style={styles.textHeader}>Order Details</Text>

            <View style={styles.orderDetailsContainer}>
              <Text style={styles.recipientRow}>Order ID: {order.orderId}</Text>
              <Text style={styles.recipientRow}>
                Order Placed: {MillisToDate(order.time_order_placed)}
              </Text>
            </View>
            <StyledButton style={styles.button}>DELAY</StyledButton>
          </ScrollView>
        </Card>
      </LinearGradient>
    </ErrorBoundary>
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
    fontFamily: 'dm-sans-bold',
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
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
    padding: 10,
    alignItems: 'flex-start',
  },
  button: {
    backgroundColor: Colors.delayRed,
  },
});

export default PaymentOrderScreen;
