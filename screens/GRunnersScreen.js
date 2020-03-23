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

import * as gRunnerActions from '../store/actions/gRunner';
import OrderItem from '../components/OrderItem';
import Colors from '../constants/Colors';

const GRunnersScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const gRunners = useSelector(state => state.gRunners.gRunners);
  const dispatch = useDispatch();

  const { navigation } = props;

  const loadGrunners = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(gRunnerActions.fetchGrunners());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = navigation.addListener('willFocus', loadGrunners);

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
              onPress={loadGrunners}
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

  if (!isLoading && gRunners.length === 0) {
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
        scrollIndicatorInsets={{ right: 1 }}
        onRefresh={loadOrders}
        refreshing={isRefreshing}
        data={orders}
        keyExtractor={item => item.orderId}
        renderItem={itemData => (
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
        )}
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

export default GRunnersScreen;
