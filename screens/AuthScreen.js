import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  View,
  Button,
  ActivityIndicator,
  Alert,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../constants/Colors';
import Input from '../components/Input';
import Card from '../components/Card';
import * as authActions from '../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_UPDATE';

const initialState = {
  inputValues: {
    email: '',
    password: '',
  },
  inputValidities: {
    email: false,
    password: false,
  },
  formIsValid: false,
};

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const resetInputs = () => {
  formState = initialState;
};

const AuthScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [formHasSubmitted, setFormHasSubmitted] = useState(false);
  const dispatch = useDispatch();

  let errorMessage = useSelector((state) => state.auth.signInError);
  // console.log('AuthScreen -> errorMessage', errorMessage);
  let errorMessageJSX = (
    <View>
      {errorMessage ? (
        <Text
          style={{ color: 'red', fontSize: 12, fontFamily: 'dm-sans-regular' }}
        >
          {errorMessage.message}
        </Text>
      ) : (
        <></>
      )}
    </View>
  );
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An error Occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const authHandler = async () => {
    setError(null);
    setIsLoading(true);
    try {
      if (!formState.formIsValid) {
        setFormHasSubmitted(true);
        setIsLoading(false);
        return;
      } else {
        await dispatch(
          authActions.signin(
            formState.inputValues.email,
            formState.inputValues.password
          )
        );
      }
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 50 })}
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
            {errorMessage !== null ? errorMessageJSX : <></>}

            <ScrollView keyboardShouldPersistTaps='always'>
              <Input
                id='email'
                label='E-Mail'
                keyboardType='email-address'
                required
                returnKeyType='next'
                email
                autoCapitalize='none'
                errorText='Please enter a valid email address.'
                onInputChange={inputChangeHandler}
                initalValue=''
                blurOnSubmit={false}
                onSubmitEditing={() => this.password.focus()}
                formHasSubmitted={formHasSubmitted}
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
                onInputChange={inputChangeHandler}
                keyboardShouldPersistTaps='handled'
                inputRef={(ref) => (password = ref)}
                initalValue=''
                formHasSubmitted={formHasSubmitted}
              />
              <View style={styles.buttonContainer}>
                {isLoading ? (
                  <ActivityIndicator
                    size='small'
                    color={Colors.primaryColor}
                  /> ? (
                    errorMessage ? (
                      <Button
                        title='Login'
                        type='button'
                        color={Colors.lightPurp}
                        onPress={authHandler}
                        onPressIn={resetInputs}
                      />
                    ) : (
                      <ActivityIndicator
                        size='small'
                        color={Colors.primaryColor}
                      />
                    )
                  ) : (
                    <Button
                      title='Login'
                      type='button'
                      color={Colors.lightPurp}
                      onPress={authHandler}
                      onPressIn={resetInputs}
                    />
                  )
                ) : (
                  <Button
                    title='Login'
                    type='button'
                    color={Colors.lightPurp}
                    onPress={authHandler}
                    onPressIn={resetInputs}
                  />
                )}
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
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingVertical: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    paddingVertical: 30,
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxWidth: 90,
    maxHeight: 90,
  },
  authContainer: {
    justifyContent: 'flex-start',
    borderRadius: 8,
    opacity: 0.85,
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 15,
  },
});

export default AuthScreen;

// return async (dispatch) => {
//   const response = await fetch(
//     `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${Keys.apiKey}`,
//     {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         email,
//         password,
//         returnSecureToken: true,
//       }),
//     }
//   );

//   if (!response.ok) {
//     const errorResData = await response.json();
//     const errorId = errorResData.error.message;
//     let message = 'Something went wrong!';
//     if (errorId === 'EMAIL_NOT_FOUND') {
//       message = 'Your email is unauthorized to use this app!';
//     } else if (errorId === 'INVALID_PASSWORD') {
//       message = 'This password is invalid!';
//     }
//     throw new Error(message);
//   }

//   const resData = await response.json();
//   dispatch(
//     signedIn(
//       resData.localId,
//       resData.idToken,
//       parseInt(resData.expiresIn) * 1000
//     )
//   );
//   const expirationDate = new Date(
//     new Date().getTime() + parseInt(resData.expiresIn) * 1000
//   );
//   saveDataToStorage(resData.idToken, resData.localId, expirationDate);
