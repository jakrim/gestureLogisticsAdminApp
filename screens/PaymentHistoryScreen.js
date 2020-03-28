import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BallIndicator } from 'react-native-indicators';

import Colors from '../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
import * as paymentActions from '../store/actions/payments';
import PaymentItem from '../components/PaymentItem';

const PaymentHistoryScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const payments = useSelector(state => state.payments.payments);

  const { navigation, route } = props;
  const uid = route.params.uid;

  const loadPayments = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(paymentActions.fetchPayments(uid));
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = navigation.addListener('willFocus', loadPayments);

    return willFocusSub;
  }, [navigation, loadPayments, setIsLoading]);

  useEffect(() => {
    setIsLoading(true);
    loadPayments().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadPayments]);

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
              onPress={loadPayments}
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

  const selectItemHandler = orderId => {
    navigation.navigate('PaymentOrderScreen', {
      orderId
    });
  };

  return (
    <LinearGradient
      colors={[Colors.primaryColor, Colors.lightTeal]}
      style={styles.gradient}
    >
      <FlatList
        scrollIndicatorInsets={{ right: 1 }}
        onRefresh={loadPayments}
        refreshing={isRefreshing}
        data={payments}
        keyExtractor={item => `${item.uid}`}
        renderItem={itemData => (
          <PaymentItem
            uid={itemData.item.uid}
            payment={itemData.item.payment}
            bonus={itemData.item.bonus}
            tip={itemData.item.tips}
            orderId={itemData.item.orderId}
            delivery_completed_note={itemData.item.delivery_completed_note}
            delivery_compeleted_time={itemData.item.delivery_compeleted_time}
            onSelect={() => {
              selectItemHandler(itemData.item.orderId);
            }}
          ></PaymentItem>
        )}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  text: {
    fontSize: 30,
    paddingVertical: 80
  }
});

export default PaymentHistoryScreen;
