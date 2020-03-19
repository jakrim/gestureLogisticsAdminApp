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

const OrderItem = props => {
  let TouchableComp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.product}>
      <TouchableComp onPress={props.onSelect} useForeground>
        <View style={styles.touchable}>
          <View>
            {/* <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.image }} />
            </View> */}
            <View style={styles.orderDetails}>
              <Text style={styles.title}>{props.product_name}</Text>
              <Text style={styles.address}>{props.address_string}</Text>
              <Text style={styles.address}>{props.address_string_2}</Text>
            </View>
            {/* <View style={styles.actions}>{props.children}</View> */}
          </View>
          <View style={styles.orderDetails2}>
            <Text style={styles.orderDetails2Text}>
              <Text style={{ fontFamily: 'dm-sans-bold' }}>Zone: </Text>
              {props.zone}
            </Text>
            <Text style={styles.orderDetails2Text}>
              <Text style={{ fontFamily: 'dm-sans-bold' }}>Order ID: </Text>
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
    height: 160,
    width: 300,
    margin: 20,
    backgroundColor: Colors.backgroundFeed
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden'
  },
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
  orderDetails: {
    alignItems: 'flex-start',
    // height: '17%',
    padding: 10,
    backgroundColor: Colors.backgroundFeed
  },
  title: {
    fontFamily: 'dm-sans-bold',
    fontSize: 18,
    marginVertical: 5,
    color: Colors.primaryColor
  },
  address: {
    fontFamily: 'dm-sans-regular',
    fontSize: 15,
    color: Colors.primaryColor
  },
  orderDetails2: {
    paddingTop: 25,
    paddingHorizontal: 10,
    justifyContent: 'flex-end'
    // alignItems: 'flex-end',
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
});

export default OrderItem;
