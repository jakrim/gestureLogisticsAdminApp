import React from 'react';
import {
  Platform,
  StyleSheet,
  SafeAreaView,
  Linking,
  Text,
  Button,
  Modal,
  View
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';

import LogoTitle from '../components/LogoTitle';
import StyledModal from '../components/StyledModal';

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
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';
import { LogoComponent, LogoutComponent } from './DrawerComponents';

const AuthStack = createStackNavigator();
const OrderStack = createStackNavigator();
const GRunnerStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const headerOptions = props => {
  return {
    headerTitle: props => <LogoTitle {...props} />,
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
    headerRight: () => <StyledModal style={styles.modalButton} />,
    headerStyle: {
      backgroundColor:
        Platform.OS === 'android' ? Colors.primaryColor : 'white',
      shadowColor: 'transparent',
      elevation: 0
    },
    // headerTitleAlign: 'center',
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
  };
};

export const AuthNavigator = () => (
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
      name='Login'
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

const OrderNavigator = ({ navigation }) => (
  <OrderStack.Navigator>
    <OrderStack.Screen
      name='Orders'
      component={OrdersScreen}
      options={headerOptions}
    />
    <OrderStack.Screen
      name='OrderDetailsScreen'
      component={OrderDetailsScreen}
      options={{ headerTitle: 'Order Details' }}
    />
  </OrderStack.Navigator>
);

export const GRunnerNavigator = ({ navigation }) => (
  <GRunnerStack.Navigator>
    <GRunnerStack.Screen
      name='GRunners'
      component={GRunnersScreen}
      options={headerOptions}
    />
    <GRunnerStack.Screen
      name='GRunner'
      component={GRunnerScreen}
      options={{ headerTitle: 'GRunner' }}
    />
    <GRunnerStack.Screen
      name='PaymentHistoryScreen'
      component={PaymentHistoryScreen}
      options={{ headerTitle: 'Payment History' }}
    />
    <GRunnerStack.Screen
      name='PaymentOrderScreen'
      component={PaymentOrderScreen}
      options={{ headerTitle: 'Order Details' }}
    />
  </GRunnerStack.Navigator>
);

export const GestureNavigator = () => (
  <Drawer.Navigator
    drawerContent={props => (
      <View style={{ flex: 1, paddingTop: 60 }}>
        <LogoComponent {...props} />
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
        fontFamily: 'dm-sans-boldItalic'
      }
    }}
  >
    <Drawer.Screen name='OrderStack' component={OrderNavigator} />
    <Drawer.Screen name='GRunnerStack' component={GRunnerNavigator} />
  </Drawer.Navigator>
);

const styles = StyleSheet.create({
  headerButtonLeft: {
    paddingLeft: 15
  },
  headerButtonRight: {
    paddingRight: 15
  },
  modalButton: {
    paddingRight: 15
  }
});
