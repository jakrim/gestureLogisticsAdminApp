import { SET_PAYMENTS } from '../actions/payments';

const initialState = {
  payments: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PAYMENTS:
      return {
        payments: action.payments
      };
    default:
      return state;
  }
};
