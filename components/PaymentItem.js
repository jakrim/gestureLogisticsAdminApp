import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

import Card from './Card';
import { MillisToDate, MillisToTime } from './HelperFunctions';
import Colors from '../constants/Colors';

const PaymentItem = (props) => {
  let TouchableComp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }

  const B = (props) => (
    <Text
      {...props}
      style={{
        fontFamily: 'dm-sans-bold',
        color: Colors.primaryColor,
        fontSize: 16,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  );

  return (
    <Card style={styles.card}>
      <TouchableComp
        style={styles.touchable}
        onPress={props.onSelect}
        useForeground
      >
        <View>
          <Text style={styles.productName}>{props.product_name}</Text>
          <Text style={styles.paymentText}>
            <B>Payment: </B> {props.payment}
          </Text>
          <Text style={styles.paymentText}>
            <B>Bonus: </B> {props.bonus}
          </Text>
          <Text style={styles.paymentText}>
            <B>Tip: </B> {props.tip}
          </Text>
          <Text style={styles.paymentText}>
            <B>Total Time: </B> {MillisToTime(props.total_time)}
          </Text>
        </View>
        <View>
          <View style={styles.completed}>
            <Text style={styles.paymentText}>
              <B>Order ID: </B> {props.orderId}
            </Text>
            <Text>
              <B>Completed: </B>
              {MillisToDate(props.completed_date_ms * -1)}
            </Text>
          </View>
        </View>
      </TouchableComp>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    width: 320,
    margin: 15,
    backgroundColor: Colors.backgroundFeed,
  },
  productName: {
    fontFamily: 'dm-sans-bold',
    fontSize: 18,
    paddingBottom: 5,
    color: Colors.primaryColor,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  paymentText: {
    paddingVertical: 3,
    fontSize: 15,
  },
  completed: {
    paddingTop: 5,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  details: {
    alignItems: 'flex-end',
  },
});

export default PaymentItem;
