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
  ScreenContext,
  GRunnersSearchContext,
  AreSearchingGrunners,
} from '../components/ApplicationContexts';

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
  const isSearchingOrders = useMemo(
    () => ({ areSearchingOrders, setAreSearchingOrders }),
    [areSearchingOrders, setAreSearchingOrders]
  );
  const [searchGrunners, setSearchGrunners] = useState([]);
  const searchedGrunners = useMemo(
    () => ({ searchGrunners, setSearchGrunners }),
    [searchGrunners, setSearchGrunners]
  );
  const [areSearchingGrunners, setAreSearchingGrunners] = useState(false);
  const isSearchingGrunners = useMemo(
    () => ({ areSearchingGrunners, setAreSearchingGrunners }),
    [areSearchingGrunners, setAreSearchingGrunners]
  );

  const [screenContext, setScreenContext] = useState('');
  const ScreenContextForSearch = useMemo(
    () => ({ screenContext, setScreenContext }),
    [screenContext, setScreenContext]
  );

  return (
    <NavigationContainer>
      {isAuth && !authMessage && <LoadingScreen />}

      <AreSearchingGrunners.Provider value={isSearchingGrunners}>
        <GRunnersSearchContext.Provider value={searchedGrunners}>
          <AreSearchingOrders.Provider value={isSearchingOrders}>
            <OrdersSearchContext.Provider value={searchedOrders}>
              <OrderFiltersContext.Provider value={providerValue}>
                <GrunnerFiltersContext.Provider value={gProviderValue}>
                  <ScreenContext.Provider value={ScreenContextForSearch}>
                    {isAuth && authMessage && <GestureNavigator />}
                  </ScreenContext.Provider>
                </GrunnerFiltersContext.Provider>
              </OrderFiltersContext.Provider>
            </OrdersSearchContext.Provider>
          </AreSearchingOrders.Provider>
        </GRunnersSearchContext.Provider>
      </AreSearchingGrunners.Provider>

      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
