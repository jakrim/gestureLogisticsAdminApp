import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Colors from '../constants/Colors';
import { BallIndicator } from 'react-native-indicators';

import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';

const LoadingScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      setIsLoading(true);
      dispatch(authActions.authenticate());
      props.navigation.navigate('OrdersScreen');
    } catch (err) {
      setError(err.message);
      props.navigation.navigate('SignIn');
      setIsLoading(false);
    }
  });

  useEffect(() => {
    if (error) {
      Alert.alert('You are unauthorized to use this application!', error, [
        { text: 'Okay' }
      ]);
    }
  }, [error]);

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>
        Authenticating with{' '}
        <Text style={{ color: Colors.primaryColor }}>Gesture</Text>
      </Text>
      {isLoading && <BallIndicator color={Colors.primaryColor} />}
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
    paddingVertical: 30
  }
});

export default LoadingScreen;
