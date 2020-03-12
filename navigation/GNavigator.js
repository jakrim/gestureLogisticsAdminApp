import React from 'react';
import { moduleName } from 'react-native';

// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import Colors from '../constants/Colors';

const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();

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
        // paddingTop: 25,
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

export const Home = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name='HomeScreen' component={HomeScreen} />
    <HomeStack.Screen
      name='OrderDetailsScreen'
      component={OrderDetailsScreen}
    />
  </HomeStack.Navigator>
);
