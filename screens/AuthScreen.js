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
  StyleSheet,
  Image
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
      keyboardVerticalOffset={70}
      behavior='padding'
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <LinearGradient
          colors={[Colors.primaryColor, Colors.lightTeal]}
          style={styles.gradient}
        >
          <View style={styles.image}>
            <Image source={require('../assets/logo.png')} />
          </View>
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
                onInputChange={() => {}}
                initalValue=''
              />
              <Input
                id='password'
                label='Password'
                keyboardType='default' //Default Keyboard
                secureTextEntry
                required
                minLength={5}
                autoCapitalize='none'
                errorText='Please enter a valid password.'
                onInputChange={() => {}}
                initalValue=''
              />
              <View style={styles.buttonContainer}>
                <Button
                  title='Login'
                  color={Colors.lightPurp} /*onPress={authHandler}*/
                />
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
    paddingVertical: 50,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  image: {
    paddingVertical: 30,
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-start',
    alignItems: 'center'
    // maxWidth: 150
    // maxHeight: 150
  },
  authContainer: {
    justifyContent: 'flex-start',
    opacity: 0.85,
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 15
  }
});

export default AuthScreen;
