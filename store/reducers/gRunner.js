import { SET_GRUNNERS } from '../actions/orders';

const initialState = {
  gRunners: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GRUNNERS:
      return {
        gRunners: action.gRunners
      };
    default:
      return state;
  }
};
