import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Dimensions,
} from 'react-native';

import Card from './Card';
import Colors from '../constants/Colors';
import { MillisToDate } from './HelperFunctions';

const windowWidth = Dimensions.get('window').width;

const OrderItem = (props) => {
  let TouchableComp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }

  const B = (props) => (
    <Text style={{ fontFamily: 'dm-sans-bold' }}>{props.children}</Text>
  );
  return (
    <Card style={styles.product}>
      <TouchableComp onPress={props.onSelect} useForeground>
        <View style={styles.touchable}>
          <View style={styles.orderDetails}>
            <Text style={styles.productName}>{props.product_name}</Text>
            <Text style={styles.address}>
              {props.address_string}
              {'\n'}
              Apt/Extra:{' '}
              {props.address_string_2 ? (
                <Text style={styles.address}>{props.address_string_2}</Text>
              ) : (
                <Text></Text>
              )}
            </Text>

            {/* {props.schedule ? ( */}
            <Text style={styles.scheduled}>
              <B>Delivery: </B>
              <Text style={{ color: Colors.delayRed }}>
                {MillisToDate(props.properTime)}
                {/* {MillisToDate(props.schedule)} */}
              </Text>
            </Text>
            {/* ) : ( */}
            {/* <Text style={styles.onDemand}>On Demand</Text>
            )} */}
          </View>
          {/* <View style={styles.actions}>{props.children}</View> */}
          <View style={styles.orderDetails2}>
            <Text style={styles.orderDetails2Text}>
              {MillisToDate(props.time_order_placed)}
            </Text>
            <Text style={styles.orderDetails2Text}>{props.orderID}</Text>
          </View>
        </View>
      </TouchableComp>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 140,
    width: windowWidth,
    marginTop: 4,
    backgroundColor: Colors.backgroundFeed,
  },
  touchable: {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  },
  orderDetails: {
    width: '100%',
    height: '72%',
    padding: 10,
    backgroundColor: Colors.backgroundFeed,
  },
  productName: {
    fontFamily: 'dm-sans-bold',
    fontSize: 19,
    paddingBottom: 5,
    color: Colors.LightColorText,
  },
  address: {
    fontFamily: 'dm-sans-regular',
    fontSize: 14,
    color: Colors.LightColorText,
  },
  onDemand: {
    paddingTop: 5,
    fontFamily: 'dm-sans-bold',
    fontSize: 15,
    color: Colors.primaryColor,
  },
  scheduled: {
    paddingTop: 5,
    fontFamily: 'dm-sans-regular',
    fontSize: 15,
    color: Colors.LightColorText,
  },
  orderDetails2: {
    paddingRight: 10,
    // paddingVertical: 10,
    alignItems: 'flex-end',
    // paddingBottom: 50,
  },
  orderDetails2Text: {
    fontFamily: 'dm-sans-regular',
    fontSize: 14,
    color: '#444',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // height: '23%',
    // paddingHorizontal: 20
  },
});

export default OrderItem;
