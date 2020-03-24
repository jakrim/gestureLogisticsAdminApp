import { SET_GRUNNERS, SET_GRUNNER } from '../actions/gRunner';

const initialState = {
  gRunners: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GRUNNERS:
      return {
        gRunners: action.gRunners
      };
    case SET_GRUNNER:
      return {
        gRunner: action.gRunner,
        uid: action.uid
      };
    default:
      return state;
  }
};
