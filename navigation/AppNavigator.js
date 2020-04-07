import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { AuthNavigator, GestureNavigator } from './GNavigator';
import StartupScreen from '../screens/StartupScreen';
import LoadingScreen from '../screens/LoadingScreen';

const AppNavigator = props => {
  const isAuth = useSelector(state => !!state.auth.token);
  const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);
  let authMessage = useSelector(
    state => state.auth.message === 'Authenticated'
  );

  return (
    <NavigationContainer>
      {isAuth && !authMessage && <LoadingScreen />}
      {isAuth && authMessage && <GestureNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
