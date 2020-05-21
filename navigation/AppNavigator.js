import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { AuthNavigator, GestureNavigator } from './GNavigator';
import StartupScreen from '../screens/StartupScreen';
import LoadingScreen from '../screens/LoadingScreen';
import {
  OrderFiltersContext,
  GrunnerFiltersContext,
  OrdersSearchContext,
  AreSearchingOrders,
} from '../components/FiltersContext';

const AppNavigator = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);
  let authMessage = useSelector(
    (state) => state.auth.message === 'Authenticated'
  );

  const [filters, setFilters] = useState({
    cities: [],
    filter: 'noFilter',
    isCity: false,
  });
  const providerValue = useMemo(() => ({ filters, setFilters }), [
    filters,
    setFilters,
  ]);
  const [gfilters, setGFilters] = useState({
    hasOrder: false,
    isCity: false,
    cities: [],
    filter: 'noFilter',
  });
  const gProviderValue = useMemo(() => ({ gfilters, setGFilters }), [
    gfilters,
    setGFilters,
  ]);
  const [searchOrders, setSearchOrders] = useState([]);
  const searchedOrders = useMemo(() => ({ searchOrders, setSearchOrders }), [
    searchOrders,
    setSearchOrders,
  ]);
  const [areSearchingOrders, setAreSearchingOrders] = useState(false);
  const isSearching = useMemo(
    () => ({ areSearchingOrders, setAreSearchingOrders }),
    [areSearchingOrders, setAreSearchingOrders]
  );

  return (
    <NavigationContainer>
      {isAuth && !authMessage && <LoadingScreen />}

      <AreSearchingOrders.Provider value={isSearching}>
        <OrdersSearchContext.Provider value={searchedOrders}>
          <OrderFiltersContext.Provider value={providerValue}>
            <GrunnerFiltersContext.Provider value={gProviderValue}>
              {isAuth && authMessage && <GestureNavigator />}
            </GrunnerFiltersContext.Provider>
          </OrderFiltersContext.Provider>
        </OrdersSearchContext.Provider>
      </AreSearchingOrders.Provider>

      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
