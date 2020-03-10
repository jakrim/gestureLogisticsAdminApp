import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  View,
  Button,
  ActivityIndicator,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';
import Input from '../components/Input';

import Card from '../components/Card';

const FORM_INPUT_UPDATE = 'FORM_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
  }
};

const [formState, dispatchFormState] = useReducer(formReducer, {
  inputValues: {},
  inputValidities: {},
  formIsValid: false
});

const AuthScreen = props => {
  return (
    <KeyboardAvoidingView
      style={styles.screen}
      keyboardVerticalOffset={50}
      behavior='padding'
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <LinearGradient
          colors={[Colors.lightTeal, Colors.primaryColor]}
          style={styles.gradient}
        >
          <Card style={styles.authContainer}>
            <ScrollView>
              <Input
                id='email'
                label='E-Mail'
                keyboardType='email-address'
                required
                returnKeyType='next'
                email
                autoCapitalize='none'
                errorText='Please enter a valid email address.'
                // onInputChange={inputChangeHandler}
                initalValue=''
              />
              <Input
                id='password'
                label='Password'
                keyboardType='default' //Default Keyboard
                required
                minLength={5}
                autoCapitalize='none'
                errorText='Please enter a valid email address'
                // onInputChange={inputChangeHandler}
                initalValue=''
              />
              <View style={styles.buttonContainer}>
                <Button title='Login' />
              </View>
            </ScrollView>
          </Card>
        </LinearGradient>
      </TouchableWithoutFeedback>
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
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default AuthScreen;
