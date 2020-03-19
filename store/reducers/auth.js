import { SIGNIN, AUTHENTICATE } from '../actions/auth';

const initialState = {
  loggedIn: false,
  token: null,
  userId: null,
  message: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN:
      return {
        token: action.token,
        userId: action.userId
      };
    case AUTHENTICATE:
      return {
        ...state,
        message: action.message
      };
    default:
      return state;
  }
};
