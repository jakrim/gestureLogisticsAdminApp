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
var moment = require('moment-timezone');

const OrderItem = props => {
  let TouchableComp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }

  // function convertMS(milliseconds) {
  //   const dateObj = new Date(milliseconds * 1000);
  //   let hours = dateObj.getUTCHours();
  //   // let minutes = dateObj.getUTCMinutes();
  //   let seconds = dateObj.getUTCSeconds();
  //   let formattedTime =
  //     hours.toString().padStart(2, '0') +
  //     ':' +
  //     // minutes.toString().padStart(2, '0') +
  //     ':' +
  //     seconds.toString().padStart(2, '0');

  //   var AmOrPm = hours >= 12 ? 'pm' : 'am';
  //   hours = hours % 12 || 12;
  //   var minutes = dt.getMinutes();
  //   var finalTime = 'Time  - ' + hours + ':' + minutes + ' ' + AmOrPm;

  //   return finalTime;
  // }
  // var dt = new Date();
  // var hours = dt.getHours();

  // console.log('hours', finalTime);

  var scheduleDate = new Date(props.schedule).toUTCString();

  var myTimezone = 'America/Toronto';
  var myDatetimeFormat = 'hh:mma z MM/DD';
  var myDatetimeString = moment(scheduleDate)
    .tz(myTimezone)
    .format(myDatetimeFormat);
  console.log('myDatetimeString', myDatetimeString);

  // const time = new Date();
  // console.log(Date(time.toString()));

  return (
    <Card style={styles.product}>
      <TouchableComp onPress={props.onSelect} useForeground>
        <View style={styles.touchable}>
          <View>
            {/* <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.image }} />
            </View> */}
            <View style={styles.orderDetails}>
              <Text style={styles.productName}>{props.product_name}</Text>
              <Text style={styles.address}>{props.address_string}</Text>
              <Text style={styles.address}>{props.address_string_2}</Text>
              {props.schedule ? (
                <Text style={styles.scheduled}>
                  Schedule:{'\n'}
                  <Text style={{ fontFamily: 'dm-sans-regular' }}>
                    {/* {convertMS(props.schedule)} */}
                    {myDatetimeString}
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
              <Text style={{ fontFamily: 'dm-sans-bold' }}>Zone: </Text>
              {props.zone}
            </Text>
            <Text style={styles.orderDetails2Text}>
              {/* {convertMS(props.time_order_placed)} */}
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
    height: 200,
    width: 300,
    margin: 15,
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
  productName: {
    fontFamily: 'dm-sans-bold',
    fontSize: 18,
    // marginVertical: 5,
    color: Colors.primaryColor
  },
  address: {
    fontFamily: 'dm-sans-regular',
    fontSize: 15,
    color: Colors.primaryColor
  },
  scheduled: {
    fontFamily: 'dm-sans-bold',
    fontSize: 15,
    color: Colors.primaryColor
  },
  orderDetails2: {
    paddingTop: 15,
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
