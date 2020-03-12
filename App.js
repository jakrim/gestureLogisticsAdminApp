import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';

import { Auth, Home } from './navigation/GNavigator';

import database from './database';

// import GNavigator from './navigation/GNavigator';
// import Card from './components/Card';

const fetchFonts = () => {
  return Font.loadAsync({
    'dm-sans-bold': require('./assets/fonts/DMSans-Bold.ttf'),
    'dm-sans-boldItalic': require('./assets/fonts/DMSans-BoldItalic.ttf'),
    'dm-sans-medium': require('./assets/fonts/DMSans-Medium.ttf'),
    'dm-sans-regular': require('./assets/fonts/DMSans-Regular.ttf'),
    'dm-sans-regularItalic': require('./assets/fonts/DMSans-RegularItalic.ttf')
  });
};

// const connectDB = () => {
//   database();
//   setDatabaseConnect(true);
// };

const Stack = createStackNavigator();

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [databaseConnect, setDatabaseConnect] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  while (!fontLoaded && !databaseConnect) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        // startAsync={connectDB}
        onFinish={() => setFontLoaded(true)}
        onError={err => console.log(err)}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        {!isLoggedIn ? (
          <Stack.Screen name='SignIn' component={Auth} />
        ) : (
          // <Stack.Screen name='SignIn' component={AuthScreen} />
          <>
            <Stack.Screen name='Home' component={Home} />
            {/* <Stack.Screen name='Settings' component={SettingsScreen} /> */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>

    // <NavigationContainer>
    //   <AuthStack.Navigator>
    //     <AuthStack.Screen name='AuthScreen' component={AuthScreen} />
    //   </AuthStack.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  }
});
