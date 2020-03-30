import { SIGNEDIN, AUTHENTICATE, LOGOUT } from '../actions/auth';

const initialState = {
  loggedIn: false,
  token: null,
  userId: null,
  message: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNEDIN:
      return {
        userId: action.userId,
        token: action.token
      };
    case AUTHENTICATE:
      return {
        ...state,
        message: action.message
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
