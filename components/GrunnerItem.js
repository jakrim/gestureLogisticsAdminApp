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
import Colors from '../constants/Colors';

const GRunnerItem = props => {
  let TouchableComp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }

  const B = props => (
    <Text style={{ fontFamily: 'dm-sans-bold' }}>{props.children}</Text>
  );

  return (
    <Card style={styles.card}>
      <TouchableComp onPress={props.onSelect} useForeground>
        <View style={styles.touchable}>
          <View>
            <View style={styles.gRunnerDetailsContainer}>
              <Text style={styles.gRunnerName}>{props.full_name}</Text>
              <Text style={styles.gRunnerDetails}>
                <B>CID: </B>
                {props.public_courier_id}
              </Text>
              <Text style={styles.gRunnerDetails}>
                <B>UID: </B>
                {props.uid}
              </Text>
              {props.current_status === 'Online' ? (
                <Text style={{ ...styles.gRunnerDetails, color: 'green' }}>
                  {props.current_status}
                </Text>
              ) : (
                <Text style={{ ...styles.gRunnerDetails, color: 'red' }}>
                  {props.current_status}
                </Text>
              )}
              <Ionicons
                name={Platform.OS === 'android' ? 'logo-android' : 'logo-apple'}
                size={20}
                color='black'
                style={styles.callTxt}
              />
            </View>
          </View>
          <View style={styles.gRunnerDetails2}>
            <Text style={styles.gRunnerDetails2Text}>
              <B>Zone: </B>
              {props.current_zone}
            </Text>
            <Text style={styles.gRunnerDetails2Text}>
              <B>Order ID: </B>
              {props.current_order}
            </Text>
          </View>
        </View>
      </TouchableComp>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 172,
    width: 320,
    margin: 15,
    backgroundColor: Colors.backgroundFeed
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  gRunnerDetailsContainer: {
    padding: 10,
    backgroundColor: Colors.backgroundFeed
  },
  gRunnerName: {
    fontFamily: 'dm-sans-bold',
    fontSize: 18,
    paddingBottom: 5,
    color: Colors.primaryColor
  },
  gRunnerDetails: {
    fontFamily: 'dm-sans-regular',
    fontSize: 15,
    color: Colors.primaryColor
  },
  gRunnerDetails2: {
    paddingHorizontal: 10,
    alignItems: 'flex-end'
  },
  gRunnerDetails2Text: {
    fontFamily: 'dm-sans-regular',
    fontSize: 14,
    color: Colors.primaryColor
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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

export default GRunnerItem;
