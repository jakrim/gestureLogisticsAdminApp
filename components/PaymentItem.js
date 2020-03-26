import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Card from './Card';
import MillisToDate from './MillisToDate';
import Colors from '../constants/Colors';

const PaymentItem = props => {
  let TouchableComp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }

  const deliveryNote = props.delivery_completed_note.split('|');
  const status = deliveryNote[0];
  const reason = deliveryNote[1];

  const B = props => (
    <Text
      {...props}
      style={{
        fontFamily: 'dm-sans-bold',
        color: Colors.primaryColor,
        fontSize: 16,
        ...props.style
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <View>
            <View style={styles.pay}>
              <Text style={styles.paymentText}>
                <B>Payment: </B> {props.payment}
              </Text>
              <Text style={styles.paymentText}>
                <B>Bonus: </B> {props.bonus}
              </Text>
              <Text style={styles.paymentText}>
                <B>Tip: </B> {props.tip}
              </Text>
            </View>
          </View>
          <View style={styles.details}>
            <Text style={styles.paymentText}>
              <B>UID: </B>
              {props.uid}
            </Text>
            <Text style={styles.paymentText}>
              <B>Order ID: </B> {props.orderId}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.paymentText}>
            <B>Status: </B> {status}
          </Text>
          <Text style={styles.paymentText}>
            <B>Reason: </B> {reason}
          </Text>
        </View>
        <View>
          <View style={styles.completed}>
            <Text>
              <B>Completed: </B>
              {MillisToDate(props.delivery_compeleted_time)}
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
    height: 220,
    width: 320,
    margin: 15,
    backgroundColor: Colors.backgroundFeed
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  pay: {
    paddingBottom: 15
  },
  paymentText: {
    padding: 3,
    fontSize: 15
  },
  completed: {
    paddingTop: 35,
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  details: {
    paddingTop: 15,
    alignItems: 'flex-end'
    // justifyContent: 'flex-start'
  }
});

export default PaymentItem;
