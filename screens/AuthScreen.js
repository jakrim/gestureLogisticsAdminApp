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
// import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import Input from '../components/Input';
import Card from '../components/Card';
// import * as authActions from '../../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_UPDATE';

// const formReducer = (state, action) => {
//   if (action.type === FORM_INPUT_UPDATE) {
//     const updatedValues = {
//       ...state.inputValues,
//       [action.input]: action.value
//     };
//     const updatedValidities = {
//       ...state.inputValidities,
//       [action.input]: action.isValid
//     };
//     let updatedFormIsValid = true;
//     for (const key in updatedValidities) {
//       updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
//     }
//     return {
//       formIsValid: updatedFormIsValid,
//       inputValidities: updatedValidities,
//       inputValues: updatedValues
//     };
//   }
//   return state;
// };

const AuthScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  // const dispatch = useDispatch();

  // const [formState, dispatchFormState] = useReducer(formReducer, {
  //   inputValues: {
  //     email: '',
  //     password: ''
  //   },
  //   inputValidities: {
  //     email: false,
  //     password: false
  //   },
  //   formIsValid: false
  // });

  // useEffect(() => {
  //   if (error) {
  //     Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
  //   }
  // }, [error]);

  // const authHandler = async () => {
  //   let action;
  //   if (isSignup) {
  //     action = authActions.signup(
  //       formState.inputValues.email,
  //       formState.inputValues.password
  //     );
  //   } else {
  //     action = authActions.login(
  //       formState.inputValues.email,
  //       formState.inputValues.password
  //     );
  //   }
  //   setError(null);
  //   setIsLoading(true);
  //   try {
  //     await dispatch(action);
  //     props.navigation.navigate('Shop');
  //   } catch (err) {
  //     setError(err.message);
  //     setIsLoading(false);
  //   }
  // };

  // const inputChangeHandler = useCallback(
  //   (inputIdentifier, inputValue, inputValidity) => {
  //     dispatchFormState({
  //       type: FORM_INPUT_UPDATE,
  //       value: inputValue,
  //       isValid: inputValidity,
  //       input: inputIdentifier
  //     });
  //   },
  //   [dispatchFormState]
  // );

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
                errorText='Please enter a valid password.'
                // onInputChange={inputChangeHandler}
                initalValue=''
              />
              <View style={styles.buttonContainer}>
                <Button title='Login' /*onPress={authHandler}*/ />
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
