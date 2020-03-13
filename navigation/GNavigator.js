import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import OrdersScreen from '../screens/OrdersScreen';
import GRunnersScreen from '../screens/GRunnersScreen';
import GRunnerScreen from '../screens/GRunnerScreen';
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
        height: 100
      },
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
  </AuthStack.Navigator>
);

export const OrderStack = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerLeft: () => (
        <Ionicons
          style={styles.headerButtons}
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
          Platform.OS === 'android' ? Colors.primaryColor : 'white'
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
    }}
  >
    <HomeStack.Screen name='HomeScreen' component={HomeScreen} />
    <HomeStack.Screen name='OrdersScreen' component={OrdersScreen} />
  </HomeStack.Navigator>
);

export const GRunnerStack = ({ navigation }) => (
  <GRunner.Navigator
    screenOptions={{
      headerLeft: () => (
        <Ionicons
          style={styles.headerButtons}
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
          Platform.OS === 'android' ? Colors.primaryColor : 'white'
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
    }}
  >
    <GRunner.Screen name='GRunnersScreen' component={GRunnersScreen} />
    <GRunner.Screen name='GRunnerScreen' component={GRunnerScreen} />
  </GRunner.Navigator>
);

export const DrawerMenu = () => (
  <Drawer.Navigator initialRouteName='Home' drawerType='slide'>
    <Drawer.Screen name='Home' component={OrderStack} />
    <Drawer.Screen name='GRunnerStack' component={GRunnerStack} />
  </Drawer.Navigator>
);

const styles = StyleSheet.create({
  headerButtons: {
    paddingLeft: 15
  }
});
