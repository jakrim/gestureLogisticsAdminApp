import React from 'react';
import { moduleName } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../screens/AuthScreen';

const AuthStack = createStackNavigator();

export default () => {
  <NavigationContainer>
    <AuthStack.Navigator>
      <AuthStack.Screen name='AuthScreen' component={AuthScreen} />
    </AuthStack.Navigator>
  </NavigationContainer>;
};
