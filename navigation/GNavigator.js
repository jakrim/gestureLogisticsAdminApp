import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItemList,
} from '@react-navigation/drawer';

import AuthScreen from '../screens/AuthScreen';
import LoadingScreen from '../screens/LoadingScreen';
import OrdersScreen, {
  ordersScreenHeaderOptions,
} from '../screens/OrdersScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import GRunnersScreen, {
  gRunnersScreenHeaderOptions,
} from '../screens/GRunnersScreen';
import GRunnerScreen from '../screens/GRunnerDetailsScreen';
import PaymentHistoryScreen from '../screens/PaymentHistoryScreen';
import PaymentOrderScreen from '../screens/PaymentOrderScreen';
import Colors from '../constants/Colors';
import { LogoComponent, LogoutComponent } from './DrawerComponents';

const AuthStack = createStackNavigator();
const OrderStack = createStackNavigator();
const GRunnerStack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const AuthNavigator = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.primaryColor,
        shadowColor: 'transparent',
        elevation: 0,
        height: 100,
      },
      headerTitleAlign: 'center',
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontSize: 25,
        fontFamily: 'dm-sans-bold',
      },
    }}
  >
    <AuthStack.Screen
      name='Login'
      component={AuthScreen}
      style={{ height: 80 }}
    />
    <AuthStack.Screen
      name='LoadingScreen'
      component={LoadingScreen}
      options={{
        headerShown: false,
      }}
    />
  </AuthStack.Navigator>
);

export const OrderNavigator = ({ navigation }) => (
  <OrderStack.Navigator
    screenOptions={
      {
        // headerTintColor: Colors.primaryColor,
      }
    }
  >
    <OrderStack.Screen
      name='Orders'
      component={OrdersScreen}
      options={ordersScreenHeaderOptions}
    />
    <OrderStack.Screen
      name='OrderDetailsScreen'
      component={OrderDetailsScreen}
      options={{
        headerTitle: 'Order Details',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: Colors.primaryColor,
          shadowColor: 'transparent',
          elevation: 0,
        },
      }}
    />
  </OrderStack.Navigator>
);

export const GRunnerNavigator = ({ navigation }) => (
  <GRunnerStack.Navigator
    screenOptions={{
      headerTintColor: Colors.primaryColor,
    }}
  >
    <GRunnerStack.Screen
      name='GRunners'
      component={GRunnersScreen}
      options={gRunnersScreenHeaderOptions}
    />
    <GRunnerStack.Screen
      name='GRunner'
      component={GRunnerScreen}
      options={{
        headerTitle: 'G Runner',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: Colors.primaryColor,
          shadowColor: 'transparent',
          elevation: 0,
        },
      }}
    />
    <GRunnerStack.Screen
      name='PaymentHistoryScreen'
      component={PaymentHistoryScreen}
      options={{
        headerTitle: 'Payment History',
        headerTintColor: Colors.primaryColor,
        headerStyle: {
          backgroundColor: 'white',
          shadowColor: 'transparent',
          elevation: 0,
        },
      }}
    />
    <GRunnerStack.Screen
      name='PaymentOrderScreen'
      component={PaymentOrderScreen}
      options={{
        headerTitle: 'Order Details',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: Colors.primaryColor,
          shadowColor: 'transparent',
          elevation: 0,
        },
      }}
    />
  </GRunnerStack.Navigator>
);

export const GestureNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => (
      <View style={{ flex: 1, paddingTop: 60 }}>
        <LogoComponent {...props} style={{ paddingBottom: 50 }} />
        <DrawerItemList {...props} />
        <LogoutComponent {...props} />
      </View>
    )}
    initialRouteName='OrderStack'
    drawerType='slide'
    drawerContentOptions={{
      activeTintColor: Colors.primaryColor,
      itemStyle: { paddingVertical: 10 },
      labelStyle: {
        fontSize: 18,
        fontFamily: 'dm-sans-boldItalic',
      },
    }}
  >
    <Drawer.Screen name='Orders' component={OrderNavigator} />
    <Drawer.Screen name='G Runners' component={GRunnerNavigator} />
  </Drawer.Navigator>
);
