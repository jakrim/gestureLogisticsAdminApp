import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import { useDispatch } from 'react-redux';
import { CommonActions } from '@react-navigation/native';

import * as authActions from '../store/actions/auth';
import Colors from '../constants/Colors';

const StartupScreen = props => {
  const { navigation } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: 'SignIn', screen: 'Login' }]
          })
        );
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;

      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: 'SignIn', screen: 'Login' }]
          })
        );
        // props.navigation.reset();
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'OrderStack' }]
        })
      );
      dispatch(authActions.signedIn(userId, token, expirationTime));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size='large' color={Colors.primaryColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default StartupScreen;