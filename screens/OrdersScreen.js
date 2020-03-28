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
    const willFocusSub = navigation.addListener('willFocus', loadOrders);

    return willFocusSub;
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
            An error occurred!
          </Text>
          {!isLoading ? (
            <Button
              title='Try again'
              onPress={loadOrders}
              color={Colors.LightColorText}
            />
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
          <Text>No orders found!</Text>
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
    <LinearGradient
      colors={[Colors.primaryColor, Colors.lightTeal]}
      style={styles.gradient}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        scrollIndicatorInsets={{ right: 1 }}
        onRefresh={loadOrders}
        refreshing={isRefreshing}
        data={orders}
        keyExtractor={item => item.orderId}
        renderItem={itemData => {
          if (!itemData.item.schedule) {
            return (
              <OrderItem
                order_Id={itemData.item.orderId}
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
                order_Id={itemData.item.orderId}
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
    alignItems: 'center'
  }
});

export default OrdersScreen;
