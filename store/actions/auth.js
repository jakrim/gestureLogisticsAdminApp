import { Keys } from '../../api-key';
import { AsyncStorage } from 'react-native';

export const SIGNIN = 'SIGNIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const SIGNEDIN = 'SIGNEDIN';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

let timer;

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const signedIn = (userId, token, expiryTime) => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: SIGNEDIN, userId, token });
  };
};

export const signin = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${Keys.apiKey}`,
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
        body: JSON.stringify({
          // userId
        }),
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

// export const refreshData = (refreshToken) => {
//   return async (dispatch) => {
//     try {
//       const response = await fetch(
//         `https://securetoken.googleapis.com/v1/token?key=${Keys.apiKey}`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//           body: 'grant_type=refresh_token&refresh_token=' + refreshToken,
//         }
//       );

//       if (!response.ok) {
//         throw new Error('Error in fetching refresh token!');
//       }
//       const resData = await response.json();

//       // NOTE!!! YOU HAVE TO USE id_token NOT idToken
//       dispatch(
//         authenticate(
//           resData.id_token,
//           resData.user_id,
//           parseInt(resData.expires_in) * 1000
//         )
//       );
//       // The first new Date converts the second's huge number of miliseconds in a concrete date.

//       const expirationDate = new Date(
//         new Date().getTime() + parseInt(resData.expires_in) * 1000
//       );

//       // Use this to test it
//       //const expirationDate = new Date(new Date().getTime() + 20 * 1000);

//       saveDataToStorage(
//         resData.id_token,
//         resData.user_id,
//         expirationDate,
//         resData.email,
//         resData.refresh_token
//       );
//     } catch (error) {
//       throw error;
//     }
//   };
// };

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

const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
