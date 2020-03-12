import React from 'react';
import { moduleName } from 'react-native';

// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';

const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();

export const Auth = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name='AuthScreen' component={AuthScreen} />
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
