import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import authReducer from './store/reducers/auth';
import { Auth, Home, DrawerMenu } from './navigation/GNavigator';

const fetchFonts = () => {
  return Font.loadAsync({
    'dm-sans-bold': require('./assets/fonts/DMSans-Bold.ttf'),
    'dm-sans-boldItalic': require('./assets/fonts/DMSans-BoldItalic.ttf'),
    'dm-sans-medium': require('./assets/fonts/DMSans-Medium.ttf'),
    'dm-sans-regular': require('./assets/fonts/DMSans-Regular.ttf'),
    'dm-sans-regularItalic': require('./assets/fonts/DMSans-RegularItalic.ttf')
  });
};

const rootReducer = combineReducers({
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const Stack = createStackNavigator();

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  while (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={err => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator headerMode='none'>
          <Stack.Screen name='SignIn' component={Auth} />
          <Stack.Screen name='OrderStack' component={DrawerMenu} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
