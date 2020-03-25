import { SET_GRUNNERS, SET_GRUNNER } from '../actions/gRunner';

const initialState = {
  gRunners: [],
  gRunner: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GRUNNERS:
      return {
        ...state,
        gRunners: action.gRunners
      };
    case SET_GRUNNER:
      return {
        ...state,
        gRunner: action.gRunner
      };
    default:
      return state;
  }
};
