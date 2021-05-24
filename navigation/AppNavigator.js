import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { AuthNavigator, GestureNavigator } from './GNavigator';
import StartupScreen from '../screens/StartupScreen';
import LoadingScreen from '../screens/LoadingScreen';
import OrdersScreen from '../screens/OrdersScreen';
import {
  OrderFiltersContext,
  GrunnerFiltersContext,
  OrdersSearchContext,
  AreSearching,
  ScreenContext,
  GRunnersSearchContext,
  AscendingData
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
    isCity: false
  });
  const filterFunction = useMemo(() => ({ filters, setFilters }), [
    filters,
    setFilters
  ]);
  const [gfilters, setGFilters] = useState({
    hasOrder: false,
    isCity: false,
    cities: [],
    filter: 'noFilter'
  });
  const gFilterFunction = useMemo(() => ({ gfilters, setGFilters }), [
    gfilters,
    setGFilters
  ]);
  const [searchOrders, setSearchOrders] = useState([]);
  const searchedOrders = useMemo(() => ({ searchOrders, setSearchOrders }), [
    searchOrders,
    setSearchOrders
  ]);

  const [searchGrunners, setSearchGrunners] = useState([]);
  const searchedGrunners = useMemo(
    () => ({ searchGrunners, setSearchGrunners }),
    [searchGrunners, setSearchGrunners]
  );
  const [areSearching, setAreSearching] = useState(false);
  const isSearching = useMemo(() => ({ areSearching, setAreSearching }), [
    areSearching,
    setAreSearching
  ]);

  const [screenContext, setScreenContext] = useState('');
  const ScreenContextForSearch = useMemo(
    () => ({ screenContext, setScreenContext }),
    [screenContext, setScreenContext]
  );
  const [ascending, setAscending] = useState('');
  const AscendingDataForSearch = useMemo(() => ({ ascending, setAscending }), [
    ascending,
    setAscending
  ]);

  return (
    <NavigationContainer>
      {isAuth && !authMessage && <LoadingScreen />}

      <AscendingData.Provider value={AscendingDataForSearch}>
        <AreSearching.Provider value={isSearching}>
          <GRunnersSearchContext.Provider value={searchedGrunners}>
            <OrdersSearchContext.Provider value={searchedOrders}>
              <OrderFiltersContext.Provider value={filterFunction}>
                <GrunnerFiltersContext.Provider value={gFilterFunction}>
                  <ScreenContext.Provider value={ScreenContextForSearch}>
                    {isAuth && authMessage && <GestureNavigator />}
                  </ScreenContext.Provider>
                </GrunnerFiltersContext.Provider>
              </OrderFiltersContext.Provider>
            </OrdersSearchContext.Provider>
          </GRunnersSearchContext.Provider>
        </AreSearching.Provider>
      </AscendingData.Provider>

      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
