import React, { useEffect } from 'react';
import {
  Text,
  View,
  Button,
  FlatList,
  ScrollView,
  StyleSheet
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../constants/Colors';
import { getOrderData } from '../helpers/apiHelpers';

const OrdersScreen = ({ navigation }) => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await getOrderData();
      // .then(res => res.json()).then
      // const data = await response.json();
      const items = response.data.result.data;
      console.log(items);
    };
  }, []);

  return (
    <LinearGradient
      colors={[Colors.primaryColor, Colors.lightTeal]}
      style={styles.gradient}
    >
      <FlatList />
      <View>
        <Text>Home Screen</Text>
        <Button
          title='Go to Order Details Screen'
          onPress={() => {
            navigation.push('OrderDetailsScreen');
          }}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    // paddingVertical: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
});

export default OrdersScreen;
