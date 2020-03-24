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

import Card from './Card';
import Colors from '../constants/Colors';
import MillisToDate from './MillisToDate';

const OrderItem = props => {
  let TouchableComp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }

  const B = props => (
    <Text style={{ fontFamily: 'dm-sans-bold' }}>{props.children}</Text>
  );

  return (
    <Card style={styles.product}>
      <TouchableComp onPress={props.onSelect} useForeground>
        <View style={styles.touchable}>
          <View>
            <View style={styles.orderDetails}>
              <Text style={styles.productName}>{props.product_name}</Text>
              <Text style={styles.address}>{props.address_string}</Text>
              <Text style={styles.address}>{props.address_string_2}</Text>
              {props.schedule ? (
                <Text style={styles.scheduled}>
                  Time:{' '}
                  <Text style={{ fontFamily: 'dm-sans-regular' }}>
                    {MillisToDate(props.schedule)}
                  </Text>
                </Text>
              ) : (
                <Text style={styles.scheduled}>On Demand</Text>
              )}
            </View>
            {/* <View style={styles.actions}>{props.children}</View> */}
          </View>
          <View style={styles.orderDetails2}>
            <Text style={styles.orderDetails2Text}>
              <B>Zone: </B>
              {props.zone}
            </Text>
            <Text style={styles.orderDetails2Text}>
              <B>Order ID: </B>
              {props.order_Id}
            </Text>
          </View>
        </View>
      </TouchableComp>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 170,
    width: 320,
    margin: 15,
    backgroundColor: Colors.backgroundFeed
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  orderDetails: {
    // alignItems: 'flex-start',
    // height: '17%',
    padding: 10,
    backgroundColor: Colors.backgroundFeed
  },
  productName: {
    fontFamily: 'dm-sans-bold',
    fontSize: 18,
    paddingBottom: 5,
    color: Colors.primaryColor
  },
  address: {
    fontFamily: 'dm-sans-regular',
    fontSize: 15,
    color: Colors.primaryColor
  },
  scheduled: {
    paddingTop: 5,
    fontFamily: 'dm-sans-bold',
    fontSize: 15,
    color: Colors.primaryColor
  },
  orderDetails2: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'flex-end'
  },
  orderDetails2Text: {
    fontFamily: 'dm-sans-regular',
    fontSize: 14,
    color: Colors.primaryColor
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
    // height: '23%',
    // paddingHorizontal: 20
  }
  // imageContainer: {
  //   width: '100%',
  //   height: '60%',
  //   borderTopLeftRadius: 10,
  //   borderTopRightRadius: 10,
  //   overflow: 'hidden'
  // },
  // image: {
  //   width: '100%',
  //   height: '100%'
  // },
});

export default OrderItem;
