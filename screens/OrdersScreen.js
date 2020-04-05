import React, { useState, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  Button,
  FlatList,
  ScrollView,
  StyleSheet
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { BallIndicator } from 'react-native-indicators';

import ErrorBoundary from '../components/ErrorBoundary';
import StyledModal from '../components/StyledModal';
import StyledButton from '../components/StyledButton';
import * as ordersActions from '../store/actions/orders';
import OrderItem from '../components/OrderItem';
import Colors from '../constants/Colors';

const OrdersScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const orders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch();

  const { navigation } = props;

  const loadOrders = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    setIsRefreshing(true);
    try {
      await dispatch(ordersActions.fetchOrders());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadOrders);

    return () => unsubscribe();
  }, [navigation, loadOrders]);

  useEffect(() => {
    setIsLoading(true);
    loadOrders().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadOrders]);

  if (error) {
    return (
      <LinearGradient
        colors={[Colors.primaryColor, Colors.lightTeal]}
        style={styles.gradient}
      >
        <View style={styles.centered}>
          <Text
            style={{
              fontSize: 20,
              color: Colors.darkPurp
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
    );
  }

  if (isLoading) {
    return (
      <LinearGradient
        colors={[Colors.primaryColor, Colors.lightTeal]}
        style={styles.gradient}
      >
        <View style={styles.centered}>
          <BallIndicator color={Colors.backgroundFeed} />
        </View>
      </LinearGradient>
    );
  }

  if (!isLoading && orders.length === 0) {
    return (
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
    );
  }

  const selectItemHandler = (id, name) => {
    navigation.navigate('OrderDetailsScreen', {
      orderId: id,
      product_name: name
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
          keyExtractor={item => item.time_order_placed.toString()}
          renderItem={itemData => {
            if (!itemData.item.schedule) {
              return (
                <OrderItem
                  order_Id={itemData.item.orderID}
                  product_name={itemData.item.product_name}
                  address_string={itemData.item.address_string}
                  time_order_placed={itemData.item.time_order_placed}
                  address_string_2={itemData.item.address_string_2}
                  zone={itemData.item.zone}
                  onSelect={() => {
                    selectItemHandler(
                      itemData.item.orderId,
                      itemData.item.product_name
                    );
                  }}
                ></OrderItem>
              );
            } else {
              return (
                <OrderItem
                  order_Id={itemData.item.orderID}
                  product_name={itemData.item.product_name}
                  address_string={itemData.item.address_string}
                  time_order_placed={itemData.item.time_order_placed}
                  schedule={itemData.item.schedule}
                  address_string_2={itemData.item.address_string_2}
                  zone={itemData.item.zone}
                  onSelect={() => {
                    selectItemHandler(
                      itemData.item.orderId,
                      itemData.item.product_name
                    );
                  }}
                ></OrderItem>
              );
            }
          }}
        />
      </LinearGradient>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  errorText: {
    textAlign: 'center',
    fontFamily: 'dm-sans-regular',
    fontSize: 18,
    color: Colors.backgroundFeed,
    padding: 10
  },
  button: {
    backgroundColor: Colors.accentColor
  }
});

export default OrdersScreen;
