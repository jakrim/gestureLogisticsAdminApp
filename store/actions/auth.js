import { AsyncStorage } from 'react-native';
import { token, basicUrl, URL } from '../../database/index.js';
import firebase from 'firebase/app';
import 'firebase/auth';

export const SIGNIN = 'SIGNIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const SIGNEDIN = 'SIGNEDIN';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';
export const SIGNIN_ERROR = 'SIGNIN_ERROR';

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const signedIn = (userId, token) => {
  return (dispatch) => {
    dispatch({ type: SIGNEDIN, userId, token });
  };
};

export const signin = (email, password, callback) => {
  return async (dispatch, getState) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (data) => {
          let userToken = await token();
          saveDataToStorage(userToken, data.user.uid);
          dispatch(signedIn(data.user.uid, userToken));
        })
        .catch((errorMessage) => {
          dispatch({ type: SIGNIN_ERROR, errorMessage });
        });
    } catch (err) {
      console.log('Error in try catch block', err);
    }
  };
};

export const authenticate = () => {
  return async (dispatch, getState) => {
    var _basicUrl = await basicUrl();
    const response = await fetch(`${URL}/logistics_auth?${_basicUrl}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    const resData = await response.json();

    const resMessage = resData.result.data.message;
    if (resMessage === 'Authenticated') {
      dispatch({ type: AUTHENTICATE, message: resMessage });
    } else {
      dispatch({ type: LOGOUT });
    }
  };
};

export const logout = () => {
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

const saveDataToStorage = (token, userId) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
    })
  );
};
