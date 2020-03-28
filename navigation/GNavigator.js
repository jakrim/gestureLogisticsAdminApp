import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LogoTitle from '../components/LogoTitle';
import AuthScreen from '../screens/AuthScreen';
import LoadingScreen from '../screens/LoadingScreen';
import OrdersScreen from '../screens/OrdersScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import GRunnersScreen from '../screens/GRunnersScreen';
import GRunnerScreen from '../screens/GRunnerDetailsScreen';
import PaymentHistoryScreen from '../screens/PaymentHistoryScreen';
import PaymentOrderScreen from '../screens/PaymentOrderScreen';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
const GRunner = createStackNavigator();
const Drawer = createDrawerNavigator();

export const Auth = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.primaryColor,
        shadowColor: 'transparent',
        elevation: 0,
        height: 100
      },
      headerTitleAlign: 'center',
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontSize: 25,
        fontFamily: 'dm-sans-bold'
      }
    }}
  >
    <AuthStack.Screen
      name='G-Manager Login'
      component={AuthScreen}
      style={{ height: 80 }}
    />
    <AuthStack.Screen
      name='LoadingScreen'
      component={LoadingScreen}
      options={{
        headerShown: false
      }}
    />
  </AuthStack.Navigator>
);

export const OrderStack = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerTintColor: Colors.primaryColor
    }}
  >
    <HomeStack.Screen
      name='Orders'
      component={OrdersScreen}
      options={{
        headerTitle: props => <LogoTitle {...props} />,
        headerLeft: () => (
          <Ionicons
            style={styles.headerButtonLeft}
            name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            color={Platform.OS === 'android' ? 'white' : Colors.primaryColor}
            size={25}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        ),
        headerRight: () => (
          <Ionicons
            style={styles.headerButtonRight}
            name={Platform.OS === 'android' ? 'md-funnel' : 'md-funnel'}
            color={Platform.OS === 'android' ? 'white' : Colors.primaryColor}
            size={25}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        ),
        headerStyle: {
          backgroundColor:
            Platform.OS === 'android' ? Colors.primaryColor : 'white',
          shadowColor: 'transparent',
          elevation: 0
        },
        // headerTitleAlign: 'center',
        headerTintColor:
          Platform.OS === 'android' ? 'white' : Colors.primaryColor
      }}
    />
    <HomeStack.Screen
      name='OrderDetailsScreen'
      component={OrderDetailsScreen}
      options={{ headerTitle: 'Order Details' }}
    />
  </HomeStack.Navigator>
);

export const GRunnerStack = ({ navigation }) => (
  <GRunner.Navigator
    screenOptions={{
      headerTintColor: Colors.primaryColor
    }}
  >
    <GRunner.Screen
      name='GRunners'
      component={GRunnersScreen}
      options={{
        headerTitle: props => <LogoTitle {...props} />,
        headerLeft: () => (
          <Ionicons
            style={styles.headerButtonLeft}
            name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            color={Platform.OS === 'android' ? 'white' : Colors.primaryColor}
            size={25}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        ),
        headerStyle: {
          backgroundColor:
            Platform.OS === 'android' ? Colors.primaryColor : 'white',
          shadowColor: 'transparent',
          elevation: 0
        },
        // headerTitleAlign: 'center',
        headerTintColor:
          Platform.OS === 'android' ? 'white' : Colors.primaryColor
      }}
    />
    <GRunner.Screen
      name='GRunner'
      component={GRunnerScreen}
      options={{ headerTitle: 'GRunner' }}
    />
    <GRunner.Screen
      name='PaymentHistoryScreen'
      component={PaymentHistoryScreen}
      options={{ headerTitle: 'Payment History' }}
    />
    <GRunner.Screen
      name='PaymentOrderScreen'
      component={PaymentOrderScreen}
      options={{ headerTitle: 'Order Details' }}
    />
  </GRunner.Navigator>
);

export const DrawerMenu = () => (
  <Drawer.Navigator initialRouteName='LoadingScreen' drawerType='slide'>
    <Drawer.Screen name='GRunnerStack' component={GRunnerStack} />
    <Drawer.Screen name='OrderStack' component={OrderStack} />
  </Drawer.Navigator>
);

const styles = StyleSheet.create({
  headerButtonLeft: {
    paddingLeft: 15
  },
  headerButtonRight: {
    paddingRight: 15
  }
});
