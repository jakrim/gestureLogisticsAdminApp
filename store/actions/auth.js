import { Keys } from '../../api-key';
import { AsyncStorage } from 'react-native';
import { token, basicUrl, URL } from '../../database/index.js';

export const SIGNIN = 'SIGNIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const SIGNEDIN = 'SIGNEDIN';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const signedIn = (userId, token) => {
  return (dispatch) => {
    dispatch({ type: SIGNEDIN, userId, token });
  };
};

export const signin = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      basicUrl`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${Keys.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'Your email is unauthorized to use this app!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is invalid!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    dispatch(
      signedIn(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

export const authenticate = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    const response = await fetch(
      `https://us-central1-gesture-dev.cloudfunctions.net/logistics_auth?uid=${userId}`,
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
    })
  );
};
