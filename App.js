import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import authReducer from './store/reducers/auth';
import ordersReducer from './store/reducers/orders';
import gRunnerReducer from './store/reducers/gRunner';
import paymentsReducer from './store/reducers/payments';
import AppNavigator from './navigation/AppNavigator';

const rootReducer = combineReducers({
  auth: authReducer,
  orders: ordersReducer,
  gRunners: gRunnerReducer,
  payments: paymentsReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'dm-sans-bold': require('./assets/fonts/DMSans-Bold.ttf'),
    'dm-sans-boldItalic': require('./assets/fonts/DMSans-BoldItalic.ttf'),
    'dm-sans-medium': require('./assets/fonts/DMSans-Medium.ttf'),
    'dm-sans-regular': require('./assets/fonts/DMSans-Regular.ttf'),
    'dm-sans-regularItalic': require('./assets/fonts/DMSans-RegularItalic.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  while (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={err => console.log('Error in Loading Fonts', err)}
      />
    );
  }
  console.ignoredYellowBox = ['Warning: Each'];

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
