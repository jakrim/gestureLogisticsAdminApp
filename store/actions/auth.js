import { Keys } from '../../api-key';

export const SIGNIN = 'SIGNIN';
// export const AUTHENTICATE = 'AUTHENTICATE';

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
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'Your email is unauthorized to use this app!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is invalid!';
      }
      throw new Error(message);
    }

    const resData = await response.json();
    // console.log(resData);
    if (resData.localId) {
      dispatch({
        type: SIGNIN,
        token: resData.idToken,
        userId: resData.localId
      });
    }

    // if (!resData.localId) {
    //   return;
    // }
  };
};

// export const authenticate = userId => {
//   return async (dispatch, getState) => {
//     // const userId = getState().auth.userId;

//     const response = await fetch(
//       `https://us-central1-gesture-dev.cloudfunctions.net/logistics_auth?uid=${userId}`,
//       {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           userId
//         })
//       }
//     );
//     console.log(response);

//     if (response.status === 401) {
//       // throw new Error('Sign in went wrong');
//       const errorResData = await response.json();
//       const errorId = errorResData.error.message;

//       throw new Error(message);

//     dispatch({ type: AUTHENTICATE, userId: resData.localId });
//   };
// };
