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
          dispatch(signedIn(data.user.uid, userToken));
          saveDataToStorage(userToken, data.user.uid);
        })
        .catch((errorMessage) => {
          dispatch({ type: SIGNIN_ERROR, errorMessage });
          console.log('error in dispatch catch', errorMessage.message);
        });
    } catch (err) {
      console.log('Error in try catch block', err);
      // dispatch({ type: SIGNIN_ERROR, payload: "Invalid login credentials" });
    }
  };
};

export const authenticate = () => {
  return async (dispatch, getState) => {
    var _basicUrl = await basicUrl();
    const response = await fetch(
      // `https://us-central1-gesture-dev.cloudfunctions.net/logistics_auth?uid=${userId}`,
      `${URL}/logistics_auth?${_basicUrl}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      }
    );

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

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
      // expirationDate,
    })
  );
};
