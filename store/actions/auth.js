import { Keys } from '../../api-key';
import { AsyncStorage } from 'react-native';

export const SIGNIN = 'SIGNIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const SIGNEDIN = 'SIGNEDIN';
export const LOGOUT = 'LOGOUT';

let timer;

export const signedIn = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: SIGNEDIN, userId, token });
  };
};

export const signin = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${Keys.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      console.log('signin -> errorId', errorId);
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

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
      expiryDate: expirationDate.toISOString()
    })
  );
};

export const authenticate = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    console.log('authenticate -> userId', userId);

    const response = await fetch(
      `https://us-central1-gesture-dev.cloudfunctions.net/logistics_auth?uid=42142y814y8921942891`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // userId
        })
      }
    );

    //! CHECK MESSAGE IN RESULT.DATA

    const resData = await response.json();

    const resMessage = resData.result.data.message;

    dispatch({ type: AUTHENTICATE, message: resMessage });
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime / 1000);
  };
};
