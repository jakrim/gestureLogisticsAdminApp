import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Colors from '../constants/Colors';
import { BallIndicator } from 'react-native-indicators';

import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';

const PaymentHistoryScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Payment History</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingVertical: 370,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 30,
    paddingVertical: 80
  }
});

export default PaymentHistoryScreen;
