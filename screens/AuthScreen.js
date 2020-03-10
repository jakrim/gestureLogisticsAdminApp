import React from 'react';
import { moduleName, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';
import Input from '../components/Input';

const AuthScreen = props => {
  return (
    <KeyboardAvoidingView style={styles.screen}>
      <LinearGradient
        colors={[Colors.primaryColor, Colors.accentColor]}
        style={styles.gradient}
      >
        <Card>
          <Input />
          <Input />
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
