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

              {props.current_status === 'online' ? (
                <Text style={{ ...styles.gRunnerDetails, color: 'green' }}>
                  {props.current_status}
                </Text>
              ) : props.current_status === 'offline' ? (
                <Text style={{ ...styles.gRunnerDetails, color: 'red' }}>
                  {props.current_status}
                </Text>
              ) : (
                <Text
                  style={{
                    ...styles.gRunnerDetails,
                    color: Colors.accentColor
                  }}
                >
                  {props.current_status}
                </Text>
              )}
              <Ionicons
                name={props.os === 'iOS' ? 'logo-apple' : 'logo-android'}
                size={20}
                color='black'
                style={styles.callTxt}
              />
            </View>
          </View>
          <View style={styles.gRunnerDetails2}>
            <View style={{ flexDirection: 'row' }}>
              {props.isLock ? (
                <Ionicons
                  name={Platform.OS === 'android' ? 'md-lock' : 'ios-lock'}
                  size={16}
                  color={Colors.delayRed}
                />
              ) : (
                <Ionicons
                  name={Platform.OS === 'android' ? 'md-unlock' : 'ios-unlock'}
                  size={16}
                  color='green'
                />
              )}
              {props.isLock ? (
                <Text
                  style={
                    (styles.gRunnerDetails2Text, { color: Colors.delayRed })
                  }
                >
                  {' '}
                  Locked
                </Text>
              ) : (
                <Text style={(styles.gRunnerDetails2Text, { color: 'green' })}>
                  {' '}
                  Unlocked
                </Text>
              )}
            </View>
            <Text style={styles.gRunnerDetails2Text}>
              <B>Zone: </B>
              {props.current_zone}
            </Text>
            {props.current_order !== null ? (
              <Text style={styles.gRunnerDetails2Text}>
                <B>Order ID: </B>
                {props.current_order}
              </Text>
            ) : (
              <Text
                style={
                  (styles.gRunnerDetails2Text, { color: Colors.accentColor })
                }
              >
                No current Order
              </Text>
            )}
          </View>
        </View>
      </TouchableComp>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 190,
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
