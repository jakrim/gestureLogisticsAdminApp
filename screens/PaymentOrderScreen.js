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
import OrderDetails from '../components/OrderDetails';

const PaymentOrderScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const { navigation, route } = props;

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
        <OrderDetails
          schedule={order.schedule}
          product_name={order.product_name}
          category_name={order.category_name}
          recipient_name={order.recipient_name}
          recipient_phone_number={order.recipient_phone_number}
          recipient_email={order.recipient_email}
          address_string={order.address_string}
          address_string_2={order.address_string_2}
          delivery_note={order.delivery_note}
          sender_name={order.sender_name}
          sender_phone_number={order.sender_phone_number}
          sender_email={order.sender_email}
          time_order_placed={order.time_order_placed}
          orderID={orderId}
        />
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
  orderDetails: {
    flexDirection: 'row',
    fontFamily: 'dm-sans-regular',
    fontSize: 16,
    paddingBottom: 4,
    color: Colors.primaryColor,
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
