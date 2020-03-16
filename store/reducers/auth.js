import { SIGNIN } from '../actions/auth';

const initialState = {
  loggedIn: false,
  token: null,
  userId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN:
      return {
        token: action.token,
        userId: action.userId
      };
    default:
      return state;
  }
};
