import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { AuthNavigator, GestureNavigator } from './GNavigator';
import StartupScreen from '../screens/StartupScreen';
import LoadingScreen from '../screens/LoadingScreen';
import { FiltersContext } from '../components/FiltersContext';

const AppNavigator = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);
  let authMessage = useSelector(
    (state) => state.auth.message === 'Authenticated'
  );
  const [filters, setFilters] = useState({});
  const providerValue = useMemo(() => ({ filters, setFilters }), [
    filters,
    setFilters,
  ]);

  return (
    <NavigationContainer>
      {isAuth && !authMessage && <LoadingScreen />}
      <FiltersContext.Provider value={providerValue}>
        {isAuth && authMessage && <GestureNavigator />}
      </FiltersContext.Provider>
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
