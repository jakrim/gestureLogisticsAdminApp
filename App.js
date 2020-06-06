// import './wdyr';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import AppNavigator from './navigation/AppNavigator';
import store from './store';

const fetchFonts = () => {
  return Font.loadAsync({
    'dm-sans-bold': require('./assets/fonts/DMSans-Bold.ttf'),
    'dm-sans-boldItalic': require('./assets/fonts/DMSans-BoldItalic.ttf'),
    'dm-sans-medium': require('./assets/fonts/DMSans-Medium.ttf'),
    'dm-sans-regular': require('./assets/fonts/DMSans-Regular.ttf'),
    'dm-sans-regularItalic': require('./assets/fonts/DMSans-RegularItalic.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  while (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log('Error in Loading Fonts', err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
