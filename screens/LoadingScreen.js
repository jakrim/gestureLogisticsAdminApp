import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Colors from '../constants/Colors';
import { BallIndicator } from 'react-native-indicators';

import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';

const LoadingScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const message = useSelector((state) => state.auth.message);

  useEffect(() => {
    try {
      setIsLoading(true);
      setTimeout(() => {
        dispatch(authActions.authenticate());
      }, 1000);
    } catch (err) {
      setTimeout(() => {
        setError(message);
        setIsLoading(false);
      }, 500);
    }
  });

  useEffect(() => {
    if (error) {
      Alert.alert(message, error, [{ text: 'Okay' }]);
    }
  }, [error]);

  return (
    <View style={styles.screen}>
      <Text style={styles.text}>
        Authenticating with{' '}
        <Text style={{ color: Colors.primaryColor }}>Gesture</Text>
        {/* <Text style={{ color: Colors.primaryColor, fontSize: 40 }}>
          {error}
        </Text> */}
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
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    paddingVertical: 80,
  },
});

export default LoadingScreen;
