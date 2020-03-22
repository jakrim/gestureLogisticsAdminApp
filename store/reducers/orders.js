import { SET_ORDERS } from '../actions/orders';

const initialState = {
  orders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.orders
      };
    default:
      return state;
  }
};
