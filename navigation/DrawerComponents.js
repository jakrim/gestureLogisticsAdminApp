import React, { useState } from 'react';
import {
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Button,
  Image,
  TouchableHighlight,
  View,
  Modal,
  StyleSheet
} from 'react-native';
import { DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import LogoTitle from '../components/LogoTitle';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';

export const LogoComponent = props => (
  <View
    style={{
      alignItems: 'center',
      ...props.style
    }}
  >
    <Image
      {...props}
      style={{
        width: 120,
        height: 130,
        resizeMode: 'contain'
      }}
      source={require('../assets/gesture-icon.png')}
    />
  </View>
);

export const OrdersStackComponent = props => {
  return (
    <View
      style={{
        flex: 1,
        paddingBottom: 50,
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}
    >
      <TouchableOpacity
        style={{ backgroundColor: '#aaa', width: '100%', alignItems: 'center' }}
        onPress={() => {
          props.navigation.navigate('OrderStack');
        }}
      >
        <Text>Orders Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

export const LogoutComponent = props => {
  const dispatch = useDispatch();
  return (
    <View
      style={{
        flex: 1,
        paddingBottom: 50,
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}
    >
      <SafeAreaView
        style={{ backgroundColor: '#eee', width: '100%', alignItems: 'center' }}
        forceInset={{ top: 'always', horizontal: 'never' }}
      >
        <DrawerItem
          label={({ focused, color }) => (
            <View style={{ width: 100 }}>
              <Button
                title='Logout'
                color={Colors.darkTeal}
                onPress={() => {
                  dispatch(authActions.logout());
                  // props.navigation.navigate('SignIn', { screen: 'Login' });
                }}
              />
            </View>
          )}
          icon={({ size }) => (
            <Ionicons
              color={Colors.darkTeal}
              size={size}
              name={Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'}
            />
          )}
        />
      </SafeAreaView>
    </View>
  );
};

// GRunner: body, bicycle, contacts, people

// Order: flash, notifications, rose,
