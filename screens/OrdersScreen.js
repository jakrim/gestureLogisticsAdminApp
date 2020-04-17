import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import {
  Text,
  View,
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { BallIndicator } from 'react-native-indicators';

import LogoTitle from '../components/LogoTitle';
import OrdersModal from '../components/OrdersModal';
import { Ionicons } from '@expo/vector-icons';
import ErrorBoundary from '../components/ErrorBoundary';
import StyledButton from '../components/StyledButton';
import * as ordersActions from '../store/actions/orders';
import OrderItem from '../components/OrderItem';
import Colors from '../constants/Colors';
import { FiltersContext } from '../components/FiltersContext';

const OrdersScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();
  const { filters, setFilters } = useContext(FiltersContext);

  const { navigation } = props;

  const loadOrders = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    setIsRefreshing(true);
    try {
      await dispatch(ordersActions.fetchOrders(filters));
      await dispatch(ordersActions.fetchZones());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    let mount = true;
    if (mount) {
      navigation.addListener('focus', loadOrders);
    }

    return () => (mount = false);
  }, [navigation, loadOrders]);

  useEffect(() => {
    setIsLoading(true);
    loadOrders().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadOrders]);

  // const memoOrders = useMemo(() => {
  //   return loadOrders()
  // }, [loadOrders])

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
                color: Colors.darkPurp,
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

  if (!isLoading && orders.length === 0) {
    return (
      <ErrorBoundary>
        <LinearGradient
          colors={[Colors.primaryColor, Colors.lightTeal]}
          style={styles.gradient}
        >
          <View style={styles.centered}>
            <Text style={styles.errorText}>
              An error occurred in fetching orders! Please email
              jesse@yourgesture.com or Slack Jesse Krim
            </Text>

            {!isLoading ? (
              <StyledButton
                onPress={loadOrders}
                color={Colors.backgroundFeed}
                style={styles.button}
              >
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

  const selectItemHandler = (id) => {
    navigation.navigate('OrderDetailsScreen', {
      order_ID: id,
    });
  };

  return (
    <ErrorBoundary>
      <LinearGradient
        colors={[Colors.primaryColor, Colors.lightTeal]}
        style={styles.gradient}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          scrollIndicatorInsets={{ right: 1 }}
          onRefresh={loadOrders}
          initialNumToRender={10}
          refreshing={isRefreshing}
          data={orders}
          keyExtractor={(item) => item.order_ID.toString()}
          renderItem={(itemData) => (
            <OrderItem
              order_ID={itemData.item.order_ID}
              product_name={itemData.item.product_name}
              address_string={itemData.item.address_string}
              time_order_placed={itemData.item.time_order_placed}
              schedule={itemData.item.schedule}
              address_string_2={itemData.item.address_string_2}
              zone={itemData.item.zone}
              onSelect={() => {
                selectItemHandler(itemData.item.order_ID);
              }}
            ></OrderItem>
          )}
        />
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
    // headerTitleAlign: 'center',
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
    padding: 10,
  },
  errorText: {
    textAlign: 'center',
    fontFamily: 'dm-sans-regular',
    fontSize: 18,
    color: Colors.backgroundFeed,
    padding: 10,
  },
  button: {
    backgroundColor: Colors.accentColor,
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
