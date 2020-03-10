import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import GNavigator from './navigation/GNavigator';
import Card from './components/Card';

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
        onError={err => console.log(err)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.cardContainer}>
        <Text>Here's Text SAMPLE TEXT</Text>
      </Card>
    </View>
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
