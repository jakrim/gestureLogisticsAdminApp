import {
  SIGNEDIN,
  AUTHENTICATE,
  LOGOUT,
  SET_DID_TRY_AL,
  SIGNINERROR,
} from '../actions/auth';

const initialState = {
  loggedIn: false,
  token: null,
  userId: null,
  message: null,
  didTryAutoLogin: false,
  signInError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNEDIN:
      return {
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true,
      };
    case SIGNINERROR: {
      return {
        ...state,
        signInError: action.errorMessage,
      };
    }
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    case AUTHENTICATE:
      return {
        ...state,
        message: action.message,
        didTryAutoLogin: true,
      };
    case LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true,
      };
    default:
      return state;
  }
};
