import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { BallIndicator } from 'react-native-indicators';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';
var _ = require('lodash');

import LogoTitle from '../components/LogoTitle';
import OrdersModal from '../components/OrdersModal';
import { Ionicons } from '@expo/vector-icons';
import ErrorBoundary, { throwError } from '../components/ErrorBoundary';
import StyledButton from '../components/StyledButton';
import * as ordersActions from '../store/actions/orders';
import Search from '../components/Search';
import OrderItem from '../components/OrderItem';
import Colors from '../constants/Colors';
import {
  OrderFiltersContext,
  OrdersSearchContext,
  AreSearchingOrders,
  ScreenContext,
} from '../components/ApplicationContexts';

let noFilters = {
  cities: [],
  filter: 'noFilter',
  isCity: false,
};

const OrdersScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [hasFilters, setHasFilters] = useState(false);
  let orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();
  const { filters, setFilters } = useContext(OrderFiltersContext);
  const { searchOrders, setSearchOrders } = useContext(OrdersSearchContext);
  const { screenContext, setScreenContext } = useContext(ScreenContext);
  const { areSearchingOrders, setAreSearchingOrders } = useContext(
    AreSearchingOrders
  );

  const { navigation } = props;

  useEffect(() => {
    if (areSearchingOrders === false) {
      setSearchOrders(orders);
    } else {
      setSearchOrders(searchOrders);
    }
  }, [areSearchingOrders]);

  const loadOrders = useCallback(async () => {
    let loadOrdersMount = true;
    if (loadOrdersMount) {
      setError(null);
      setIsRefreshing(true);
      setScreenContext('orders');
      try {
        if (_.isEqual(filters, noFilters)) {
          setHasFilters(false);
        } else {
          setHasFilters(true);
        }
        await dispatch(ordersActions.fetchOrders(filters));
        await dispatch(ordersActions.fetchZones());
      } catch (err) {
        setError(err.message);
      }
      setIsRefreshing(false);
    }
    return () => (loadOrdersMount = false);
  }, [dispatch, filters]);

  useEffect(() => {
    let mount = true;
    if (mount) {
      navigation.addListener('focus', loadOrders);
    }

    return () => (mount = false);
  }, [navigation, loadOrders]);

  useEffect(() => {
    let effect = true;
    if (effect) {
      setIsLoading(true);
      loadOrders()
        .then(() => {
          setIsLoading(false);
        })
        .catch((e) => {
          throwError(new Error('Asynchronous error'));
        });
    }
    return () => (effect = false);
  }, [dispatch, loadOrders]);

  const handleResetButton = () => {
    setFilters(noFilters);
  };

  if (error) {
    return (
      <ErrorBoundary>
        <LinearGradient
          colors={[Colors.primaryColor, Colors.lightTeal]}
          style={styles.gradient}
        >
          <View style={styles.centered}>
            <Text
              style={{
                fontSize: 20,
                color: Colors.backgroundFeed,
              }}
            >
              An error occurred in fetching orders!
            </Text>
            {!isLoading ? (
              <StyledButton onPress={loadOrders} color={Colors.LightColorText}>
                Try again
              </StyledButton>
            ) : (
              <BallIndicator color={Colors.LightColorText} />
            )}
          </View>
        </LinearGradient>
      </ErrorBoundary>
    );
  }

  if (isLoading) {
    return (
      <ErrorBoundary>
        <LinearGradient
          colors={[Colors.primaryColor, Colors.lightTeal]}
          style={styles.gradient}
        >
          <View style={styles.centered}>
            <BallIndicator color={Colors.backgroundFeed} />
          </View>
        </LinearGradient>
      </ErrorBoundary>
    );
  }

  // if (!isLoading && orders.length === 0) {
  //   return (
  //     <ErrorBoundary>
  //       <LinearGradient
  //         colors={[Colors.primaryColor, Colors.lightTeal]}
  //         style={styles.gradient}
  //       >
  //         <View style={styles.centered}>
  //           <Text style={styles.errorText}>
  //             <Text style={{ fontSize: 22, fontFamily: 'dm-sans-bold' }}>
  //               No Orders:
  //             </Text>{' '}
  //             {'\n'}
  //             Check your filters on the top right!
  //           </Text>
  //         </View>
  //       </LinearGradient>
  //     </ErrorBoundary>
  //   );
  // }

  const selectItemHandler = (id) => {
    navigation.navigate('OrderDetailsScreen', {
      orderID: id,
    });
  };

  return (
    <ErrorBoundary>
      <LinearGradient
        colors={[Colors.primaryColor, Colors.lightTeal]}
        style={styles.gradient}
      >
        <Search />
        <OptimizedFlatList
          maxToRenderPerBatch={10}
          showsVerticalScrollIndicator={false}
          scrollIndicatorInsets={{ right: 1 }}
          onRefresh={loadOrders}
          initialNumToRender={searchOrders.length}
          refreshing={isRefreshing}
          highermaxToRenderPerBatch={5}
          data={searchOrders}
          keyExtractor={(item) => `${item.orderID}`}
          style={{ flex: 0 }}
          renderItem={(itemData) => (
            <OrderItem
              orderID={itemData.item.orderID}
              product_name={itemData.item.product_name}
              address_string={itemData.item.address_string}
              time_order_placed={itemData.item.time_order_placed}
              schedule={itemData.item.schedule}
              address_string_2={itemData.item.address_string_2}
              zone={itemData.item.zone}
              onSelect={() => {
                selectItemHandler(itemData.item.orderID);
              }}
            ></OrderItem>
          )}
        />
        {hasFilters && (
          <View style={styles.resetButtonContainer}>
            <StyledButton
              style={styles.resetButton}
              onPress={handleResetButton}
            >
              Reset Filters
            </StyledButton>
          </View>
        )}
      </LinearGradient>
    </ErrorBoundary>
  );
};

export const ordersScreenHeaderOptions = (props) => {
  return {
    headerTitle: (props) => <LogoTitle {...props} />,
    headerLeft: () => (
      <Ionicons
        style={styles.headerButtonLeft}
        name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        color={Platform.OS === 'android' ? 'white' : Colors.primaryColor}
        size={25}
        onPress={() => {
          props.navigation.toggleDrawer();
        }}
      />
    ),
    headerRight: () => <OrdersModal style={styles.modalButton} />,
    headerStyle: {
      backgroundColor:
        Platform.OS === 'android' ? Colors.primaryColor : 'white',
      shadowColor: 'transparent',
      elevation: 0,
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
  };
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  errorText: {
    textAlign: 'center',
    fontFamily: 'dm-sans-regular',
    fontSize: 18,
    color: Colors.backgroundFeed,
    padding: 10,
  },
  resetButtonContainer: {
    paddingTop: 5,
    paddingBottom: 20,
  },
  resetButton: {
    alignItems: 'center',
    backgroundColor: 'white',
    color: Colors.accentColor,
    fontSize: 20,
    width: 200,
  },
  headerButtonLeft: {
    paddingLeft: 15,
  },
  headerButtonRight: {
    paddingRight: 15,
  },
  modalButton: {
    paddingRight: 15,
  },
});

export default OrdersScreen;
